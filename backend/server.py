from flask import Flask, request, jsonify
import database

app = Flask(__name__)


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = data.get("user")
    password = data.get("password")

    success = database.login_user(user, password)

    return jsonify({"success": success})


@app.route("/logout", methods=["POST"])
def logout():
    data = request.get_json()

    user = data.get("user")

    success = database.logout_user(user)

    return jsonify({"success": success})


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    user = data.get("user")
    password = data.get("password")

    success = database.create_user(user, password)

    return jsonify({"success": success})

@app.route('/create-project', methods=['POST'])
def create_project():
    data = request.get_json()

    project_name = data.get('projectName')
    user = data.get('user')

    success = database.create_project(project_name, user)
    
    return jsonify({"success": success})

@app.route('/join-project', methods=['POST'])
def join_project():
    data = request.get_json()

    project_id = data.get('projectID')
    user = data.get('user')

    if project_id == None or user == None:
        return jsonify({"success": False})

    success = database.add_user_to_project(int(project_id), user)

    return jsonify({"success": success})

@app.route('/leave-project', methods=['POST'])
def remove_project():
    data = request.get_json()

    project_id = data.get('projectID')
    user = data.get('user')

    if project_id == None or user == None:
        return jsonify({"success": False})

    success = database.remove_user_from_project(int(project_id), user)
    
    return jsonify({"success": success})


# functions for project manager page
app.route("/checkIn_hardware/<int:projectId>/<int:qty>", methods=["GET"])
def checkIn_hardware(projectId, qty):
    # Perform operations like decrementing available hardware quantity
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"{qty} hardware checked in"})


@app.route("/checkOut_hardware/<int:projectId>/<int:qty>", methods=["GET"])
def checkOut_hardware(projectId, qty):
    # Perform operations like decrementing available hardware quantity
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"{qty} hardware checked out"})


@app.route("/joinProject/<int:projectId>", methods=["GET"])
def joinProject(projectId):
    # Perform operations like checking if the user is authorized to join
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"Joined Project {projectId}"})


@app.route("/leaveProject/<int:projectId>", methods=["GET"])
def leaveProject(projectId):
    # Perform operations like checking if the user has joined the project
    # and interacting with MongoDB if needed.
    return jsonify({"message": f"Left Project {projectId}"})


@app.route("/getProjects", methods=["PUT"])
def get_projects():
    data = request.get_json()
    user = data.get("user")

    print(user)
    user_id = database.get_user_id(user)

    projects = database.get_projects(user_id)

    print(projects)

    return jsonify({"projects": projects, "success": True})


if __name__ == "__main__":
    database.initialize_database()
    app.run(debug=True)
    database.end_database()
