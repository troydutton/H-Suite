# app.py (Flask backend)

from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample user data (replace with a database in a production environment)
users = [
    {"username": "JT2003", "password": "UTStudent!"},
    {"username": "TDBank", "password": "GettingQuantOffer!"},
]

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get('user_id')
    username = data.get('username')
    password = data.get('password')
    
    user = next((u for u in users if u["username"] == username), None)
    if user and user["password"] == password:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Login failed"})
    


@app.route('/api/create-account', methods=['POST'])
def create_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Check if the username is already taken (you should use a database here)
    if next((u for u in users if u["username"] == username), None):
        return jsonify({"message": "Username already exists"})
    
    users.append({"username": username, "password": password})
    return jsonify({"message": "Account created successfully"})

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    username = data.get('username')
    
    # Send a password reset email to the user (not implemented here)
    return jsonify({"message": "Password reset email sent"})

if __name__ == '__main__':
    app.run(debug=True)
