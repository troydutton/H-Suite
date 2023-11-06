from pymongo import MongoClient

def checkquantityandcheckout(requestedq, projectid, hwset) -> bool:
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Projects"]
    document = db.get_collection(projectid).find_one({"_id": hwset})
    available = document["available"]
    if(requestedq > available):
        return False
    newq = available - requestedq
    db.get_collection(projectid).update_one({"_id": hwset}, {"$set": {"available": newq}})
    client.close()
    return True

def checkcapacityandcheckin(requestedq, projectid, hwset) -> bool:
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Projects"]
    document = db.get_collection(projectid).find_one({"_id": hwset})
    #get the capacity from the document
    available = document["available"]
    capacity = document["capacity"]
    if(requestedq + available > capacity):
        return False
    newq = available + requestedq
    #modify that value in the database
    db.get_collection(projectid).update_one({"_id": hwset}, {"$set": {"available": newq}})
    client.close()
    return True

def joinproject(projectid, hwsets, username) -> bool:
    #code to add user to project
    #add the user to list of users in the project
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Projects"]
    document = db.get_collection(projectid).find_one({"_id": "listofusers"})
    document["users"].append(username)
    db.get_collection(projectid).update_one({"_id": "listofusers"}, {"$set": {"users": document["users"]}})
    client.close()

def leaveproject(projectid, hwsets, username) -> bool:
    client = MongoClient("mongodb+srv://h3user:software123@h3suitedb.jnfidje.mongodb.net/")
    db = client["Projects"]
    document = db.get_collection(projectid).find_one({"_id": "listofusers"})
    #remove the user from the document
    document["users"].remove(username)
    db.get_collection(projectid).update_one({"_id": "listofusers"}, {"$set": {"users": document["users"]}})
    client.close()