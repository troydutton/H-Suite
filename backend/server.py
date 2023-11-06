from flask import Flask, request, jsonify
import database

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = data.get('user')
    password = data.get('password')

    if database.verify_credentials(user, password):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    user = data.get('user')
    password = data.get('password')

    if database.create_user(user, password):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})    

# functions for project manager page
app.route('/checkIn_hardware/<int:projectId>/<int:qty>', methods=['GET'])
def checkIn_hardware(projectId, qty):
    # Perform operations like decrementing available hardware quantity
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"{qty} hardware checked in"})

@app.route('/checkOut_hardware/<int:projectId>/<int:qty>', methods=['GET'])
def checkOut_hardware(projectId, qty):
    # Perform operations like decrementing available hardware quantity
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"{qty} hardware checked out"})

@app.route('/joinProject/<int:projectId>', methods=['GET'])
def joinProject(projectId):
    # Perform operations like checking if the user is authorized to join
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"Joined Project {projectId}"})

@app.route('/leaveProject/<int:projectId>', methods=['GET'])
def leaveProject(projectId):
    # Perform operations like checking if the user has joined the project
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"Left Project {projectId}"})

if __name__ == "__main__":
    database.initialize_database()
    app.run(debug=True)
    database.end_database()