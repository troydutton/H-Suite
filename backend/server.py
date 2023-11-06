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


if __name__ == "__main__":
    database.initialize_database()
    app.run(debug=True)
    database.end_database()