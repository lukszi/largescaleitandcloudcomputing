from flask import Flask, request, make_response

from db import authenticate_in_db, UserNotFoundException, WrongPasswordException
from tokens import create_token, verify_token, AuthInvalidException

app = Flask(__name__)


def authenticate_request() -> str:
    content = request.get_json(force=True)
    user = content["Username"]
    password = content["Password"]
    user_id = authenticate_in_db(user, password)
    jwt = create_token(user, user_id)
    return jwt


def verify_jwt():
    token = request.headers["authorization"].split(" ")[1]
    return verify_token(token)


@app.route('/authenticate', methods=['POST', "GET"])
def authenticate():
    if request.method == "POST":
        try:
            return authenticate_request()
        except (UserNotFoundException, WrongPasswordException):
            return make_response("Credentials not accepted", 401)
    elif request.method == "GET":
        try:
            return verify_jwt()
        except AuthInvalidException:
            return make_response("AuthToken invalid", 401)


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
