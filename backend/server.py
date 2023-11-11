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

@app.route('/checkout', methods=['PUT'])
def checkout():
    data = request.get_json()

    project_id = data.get('projectId')
    project = data.get('project')
    hardware_index = data.get('hardwareIndex')
    qty = data.get('qty')

    if project == None or project_id == None or hardware_index == None or qty == None:
        return jsonify({"success": False})

    success, new_quantity = database.checkout_hardware(project_id, int(hardware_index), int(qty))

    print(success)
    print(project["hardwareSets"][hardware_index]["checkedOut"])
    if success:
        project["hardwareSets"][hardware_index]["checkedOut"] = new_quantity
        available = project["hardwareSets"][hardware_index]["availability"]

    for key in project.keys():
        print(f"{key}: {project[key]}")



    return jsonify({"success": success , "project": project, "availability": available})

@app.route('/checkin1', methods=['PUT'])
def checkin1():
    data = request.get_json()

    project = data.get('project')
    project_id = data.get('projectId')
    hardware = data.get('hardwareName')
    qty = data.get('qty')
    qty = int(qty)

    print(f"qty: {qty}")
    # print(f"hardware: {hardware}")
    success = database.checkin_hardware(project_id, hardware, qty)

    if success:
        project["hardwareSets"][0]["checkedOut"] -= qty
        available = project["hardwareSets"][0]["availability"]
    
    print(f"success: {success} , project: {project}, availability: {available}")
    return jsonify({"success": success , "project": project, "availability": available})

if __name__ == "__main__":
    database.initialize_database()
    app.run(debug=True)
    database.end_database()