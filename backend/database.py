from pymongo import MongoClient
from cipher import encrypt

def create_user(userid: int, username: str, password: str) -> bool:
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Users"]

    # Verify user doesn't already exist
    if username in db.list_collection_names():
        client.close()
        return False

    # Add user collection
    collection = db[username]
    collection.insert_one({"_id":userid, "username": username, "password": encrypt(password, 10, 1)})
    
    client.close()
    return True

def verify_credentials(userid: int, username: str, password: str) -> bool:
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Users"]

    # Verify user doesn't already exist
    if username in db.list_collection_names():
        client.close()
        return False
    
    # Verify passwords match
    collection = db[username]
    document = collection.find_one({"_id": userid, "username": username})

    if encrypt(document["password"], 10, 1) != password:
        client.close()
        return False
    
    client.close()
    return True
