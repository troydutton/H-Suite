from flask import Flask, request, jsonify
import database

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = data.get('user')
    password = data.get('password')

    success = database.login_user(user, password)

    return jsonify({"success": success})
    
@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    
    user = data.get('user')

    success = database.logout_user(user)

    return jsonify({"success": success})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    user = data.get('user')
    password = data.get('password')

    success = database.create_user(user, password)
    
    return jsonify({"success": success})

@app.route('/getProjects', methods=['PUT'])
def get_projects():
    data = request.get_json()
    user = data.get('user')

    print(user)
    user_id = database.get_user_id(user)

    projects = database.get_projects(user_id)

    print(projects)

    return jsonify({"projects": projects, "success": True})

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

@app.route('/checkout', methods=['PUT'])
def checkout():
    data = request.get_json()

    project_id = data.get('projectId')
    project = data.get('project')
    hardware_index = data.get('hardware_index')
    qty = data.get('qty')

    print(f"project_id: {project_id}, project: {project}, hardware_index: {hardware_index}, qty: {qty}")

    if project == None or project_id == None or hardware_index == None or qty == None:
        return jsonify({"success": False})

    success, new_quantity, new_availability = database.checkout_hardware(project_id, int(hardware_index), int(qty))

    print(success)
    print(project["hardwareSets"][hardware_index]["checkedOut"])
    if success:
        project["hardwareSets"][hardware_index]["availability"] = new_availability
        availability = new_availability
        project["hardwareSets"][hardware_index]["checkedOut"] = new_quantity
        return jsonify({"success": success , "project": project, "availability": availability})
    else:
        return jsonify({"success": False})

@app.route('/leave-project', methods=['POST'])
def remove_project():
    data = request.get_json()

    project_id = data.get('projectID')
    user = data.get('user')
    print(f"project_id: {project_id}, user: {user}")

    if project_id == None or user == None:
        return jsonify({"success": False})

    success = database.remove_user_from_project(int(project_id), user)

    return jsonify({"success": success})

@app.route('/checkin', methods=['PUT'])
def checkin():
    data = request.get_json()

    project_id = data.get('projectId')
    project = data.get('project')
    hardware_index = data.get('hardware_index')
    qty = data.get('qty')

    print(f"project_id: {project_id}, project: {project}, hardware_index: {hardware_index}, qty: {qty}")

    if project == None or project_id == None or hardware_index == None or qty == None:
        return jsonify({"success": False})

    success, new_quantity, new_availability = database.checkin_hardware(project_id, int(hardware_index), int(qty))

    print(success)
    print(project["hardwareSets"][hardware_index]["checkedOut"])
    if success:
        project["hardwareSets"][hardware_index]["availability"] = new_availability
        availability = new_availability
        project["hardwareSets"][hardware_index]["checkedOut"] = new_quantity
        
        return jsonify({"success": success , "project": project, "availability": availability})
    else:
        return jsonify({"success": False})


if __name__ == "__main__":
    database.initialize_database()
    app.run(debug=True)
    database.end_database()