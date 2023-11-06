from pymongo import MongoClient
from cipher import encrypt, decrypt

def initialize_database() -> None:
    # Create client
    global client
    global users
    global projects
    global hwsets

    # Connect to database
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")

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
    return users.find_one(sort=[("_id", -1)])["_id"] + 1

def create_user(username: str, password: str) -> bool:
    if username == None or password == None:
        return False
    
    # Verify username is not already taken
    if users.find_one({"username": username}) != None:
        return False
    
    # Add user
    users.insert_one({"_id": generate_userid(), "username": username, "password": encrypt(password, 10, 1)})
    
    return True

def verify_credentials(username: str, password: str) -> bool:
    if username == None or password == None:
        return False
    
    user = users.find_one({"username": username, "password": encrypt(password, 10, 1)})

    # User doesn't exist or password is incorrect
    if user == None:
        return False

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
    if projects.find_one({"projectname": projectname}) != None:
        return False
    
    # Add project
    projects.insert_one({"id": generate_projectid(), "projectname": projectname, "users": [username]})
    
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
    projects.update_one({"id": projectid}, {"$inc": {"checkedOut." + str(hwsets.find_one({"name": hwset})["index"]): qty}})
    
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

        entry = {"projectId": project["id"], 
                 "projectName": project["projectname"],
                 "authorizedUsers": project["users"],
                 "hardwareSets": []}
        
        # iterate through hwsets sorted by their id
        i = 0
        for hwset in hwsets.find().sort("id", 1):
            entry["hardwareSets"].append({"hardwareName": hwset["name"], "totalCapacity": hwset["capacity"], 'availability': hwset["availability"]})
            entry["hardwareSets"][i]["checkedOut"] = project["checkedOut"][hwset["index"]]

        projects_list.append(entry)
    
    return projects_list
