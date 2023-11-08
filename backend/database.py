from pymongo import MongoClient
from cipher import encrypt, decrypt


def initialize_database() -> None:
    # Create client
    global client
    global users
    global projects
    global hwsets

    # Connect to database
    client = MongoClient(
        "mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/"
    )

    # Get collections
    users = client.data.users
    projects = client.data.projects
    hwsets = client.data.hwsets


def end_database() -> None:
    # Close client
    client.close()


def generate_userid() -> int:
    # First user recieves id 1
    if users.count_documents({}) == 0:
        return 1

    # Get last id
    return users.find_one(sort=[("id", -1)])["id"] + 1


def create_user(username: str, password: str) -> bool:
    if username == None or password == None:
        return False

    # Verify username is not already taken
    if users.find_one({"username": username}) != None:
        return False

    # Add user
    users.insert_one(
        {
            "id": generate_userid(),
            "username": username,
            "password": encrypt(password, 10, 1),
            "active": True,
        }
    )

    return True


def login_user(username: str, password: str) -> bool:
    if username == None or password == None:
        return False

    user = users.find_one({"username": username, "password": encrypt(password, 10, 1)})

    # Verify user exists and is not active
    if user == None:
        return False

    users.update_one({"id": user["id"]}, {"$set": {"active": True}})
    return True


def logout_user(username: str) -> bool:
    if username == None:
        return False

    # Verify user exists
    if users.find_one({"username": username}) == None:
        return False

    # Set user to inactive
    users.update_one({"username": username}, {"$set": {"active": False}})

    return True


def generate_projectid() -> int:
    # First project recieves id 1
    if projects.count_documents({}) == 0:
        return 1

    # Get last id
    return projects.find_one(sort=[("id", -1)])["id"] + 1


def create_project(projectname: str, username: str) -> bool:
    if projectname == None or username == None:
        return False

    # Verify user exists
    if users.find_one({"username": username}) == None:
        return False

    # Verify projectname is not already taken
    if projects.find_one({"project_name": projectname}) != None:
        return False

    # Add project
    projects.insert_one({"id": generate_projectid(), "project_name": projectname, "checked_out": [0, 0], "users": [username]})
    return True


def add_user_to_project(projectid: int, username: str) -> bool:
    if projectid == None or username == None:
        return False

    # Verify user exists
    if users.find_one({"username": username}) == None:
        return False

    # Verify project exists
    if projects.find_one({"id": projectid}) == None:
        return False
    
    # Verify user is not already in project
    if username in projects.find_one({"id": projectid})["users"]:
        return False

    # Add user to project
    projects.update_one({"id": projectid}, {"$push": {"users": username}})

    return True


def remove_user_from_project(projectid: int, username: str) -> bool:
    if projectid == None or username == None:
        return False

    # Verify user exists
    if users.find_one({"username": username}) == None:
        return False

    # Verify project exists
    if projects.find_one({"id": projectid}) == None:
        return False

    # Remove user from project
    projects.update_one({"id": projectid}, {"$pull": {"users": username}})

    return True


def checkout_hardware(projectid: int, hwset: str, qty: int) -> bool:
    if projectid == None or hwset == None or qty == None:
        return False

    # Verify project exists
    if projects.find_one({"id": projectid}) == None:
        return False

    # verify hwset exists
    if hwsets.find_one({"name": hwset}) == None:
        return False

    # Verify enough hardware is available
    if hwsets.find_one({"name": hwset})["available"] < qty:
        return False

    # Update hwset
    hwsets.update_one({"name": hwset}, {"$inc": {"available": -qty}})

    # Update project
    projects.update_one(
        {"id": projectid},
        {
            "$inc": {
                "checked_out." + str(hwsets.find_one({"name": hwset})["index"]): qty
            }
        },
    )

    return True


def checkin_hardware(projectid: int, hwset: str, qty: int) -> bool:
    if projectid == None or hwset == None or qty == None:
        return False

    # Verify project exists
    if projects.find_one({"id": projectid}) == None:
        return False

    # verify hwset exists
    if hwsets.find_one({"name": hwset}) == None:
        return False

    # Update hwset
    hwsets.update_one({"name": hwset}, {"$inc": {"available": qty}})

    return True


def get_projects(user_id: str) -> list:
    if user_id == None:
        return []

    # Verify user exists
    if users.find_one({"id": user_id}) == None:
        return []

    # get username from user_id
    username = users.find_one({"id": user_id})["username"]

    # Get projects
    projects_list = []
    for project in projects.find({"users": username}):
        entry = {
            "projectId": project["id"],
            "projectName": project["project_name"],
            "authorizedUsers": project["users"],
            "hardwareSets": [],
        }

        # iterate through hwsets sorted by their id
        i = 0
        for hwset in hwsets.find().sort("id", 1):
            entry["hardwareSets"].append(
                {
                    "hardwareName": hwset["name"],
                    "totalCapacity": hwset["capacity"],
                    "availability": hwset["availability"],
                }
            )
            entry["hardwareSets"][i]["checkedOut"] = project["checked_out"][
                hwset["index"]
            ]

        projects_list.append(entry)

    return projects_list


def get_user_id(username: str) -> int:
    if username == None:
        return -1

    # Verify user exists
    if users.find_one({"username": username}) == None:
        return -1

    # Get user id
    return users.find_one({"username": username})["id"]
