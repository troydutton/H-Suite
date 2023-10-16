from flask import Flask, request, jsonify
import database

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    userid = data.get('userid')
    user = data.get('user')
    password = data.get('password')

    if database.verify_credentials(userid, user, password):
        return "True"
    else:
        return "False"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    userid = data.get('userid')
    user = data.get('user')
    password = data.get('password')

    if database.create_user(userid, user, password):
        return "True"
    else:
        return "False"


if __name__ == "__main__":
    app.run(debug=True)