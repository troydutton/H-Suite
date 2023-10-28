from flask import Flask, request, jsonify
import database

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    userid = data.get('userid')
    user = data.get('user')
    password = data.get('password')

    if userid == None or user == None or password == None:
        return "False"

    if database.verify_credentials(int(userid), user, password):
        return "True"
    else:
        return "False"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    userid = data.get('userid')
    user = data.get('user')
    password = data.get('password')

    if userid == None or user == None or password == None:
        return "False"

    if database.create_user(int(userid), user, password):
        return "True"
    else:
        return "False"


if __name__ == "__main__":
    app.run(debug=True)