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
    return users.find_one(sort=[("id", -1)])["id"] + 1

def create_user(username: str, password: str) -> bool:
    if username == None or password == None:
        return False
    
    # Verify username is not already taken
    if users.find_one({"username": username}) != None:
        return False
    
    # Add user
    users.insert_one({"id": generate_userid(), "username": username, "password": encrypt(password, 10, 1), "active": True})
    
    return True

def verify_credentials(username: str, password: str) -> bool:
    if username == None or password == None:
        return False
    
    user = users.find_one({"username": username, "password": encrypt(password, 10, 1)})

    # Verify user exists and is not active
    if user == None:
        return False

    users.update_one({"id": user["id"]}, {"$set": {"active": True}})
    return True
