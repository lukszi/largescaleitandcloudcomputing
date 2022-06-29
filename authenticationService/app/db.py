import os

import bcrypt
import psycopg2

db_url = os.environ["DATABASE_URL"]
db_pw = os.environ["DATABASE_PASSWORD"]
db_user = os.environ["DATABASE_USER"]


def authenticate_in_db(user_name: str, password: str):
    user = __get_user_by_name(user_name)
    if user is None:
        raise UserNotFoundException()

    if bcrypt.checkpw(password.encode(), user[2].encode()):
        return user[0]
    else:
        raise WrongPasswordException()


def __get_user_by_name(user_name: str):
    conn = __get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT user_id, name, password FROM users.users WHERE name = %s', (user_name,))
    user = cur.fetchone()
    return user


def __get_db_connection():
    host = db_url.split(":")[0]
    port = db_url.split(":")[1].split("/")[0]
    dbname = db_url.split("/")[1]
    conn = psycopg2.connect(dbname=dbname, user=db_user, password=db_pw, host=host, port=port)
    return conn


class UserNotFoundException(Exception):
    pass


class WrongPasswordException(Exception):
    pass
