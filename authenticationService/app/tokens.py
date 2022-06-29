import time
from typing import Dict

import jwt
from jwt import InvalidTokenError, DecodeError, InvalidSignatureError, ExpiredSignatureError, InvalidIssuedAtError

token_validity = 604800
private_key: bytes
public_key: bytes


# Read public and private key
with open("keys/jwtRS256.key", "rb") as priv_file:
    private_key = priv_file.read()

with open("keys/jwtRS256.key.pub", "rb") as pub_file:
    public_key = pub_file.read()


def create_token(user_name: str, user_id: int) -> str:
    iat = int(time.time())
    exp = iat + token_validity
    return jwt.encode({"uid": user_id, "iss": user_name, "iat": iat, "exp": exp}, private_key, algorithm="RS256")


def verify_token(token: str) -> Dict[str, any]:
    try:
        return jwt.decode(token, public_key, algorithms="RS256")
    except (InvalidTokenError, DecodeError, InvalidSignatureError, ExpiredSignatureError, InvalidIssuedAtError):
        raise AuthInvalidException()


class AuthInvalidException(Exception):
    pass
