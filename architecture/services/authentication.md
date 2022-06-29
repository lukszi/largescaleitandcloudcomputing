# AuthenticationService

The AuthenticationService provides authentication using Json Web Tokens (JWT). 
To do so, it provides the `/authenticate` route which can be accessed using either `POST` or `GET` requests. 

## Authentication flow

The usual authentication flow consists of two stages:

### Obtaining Auth Token
1. Application sends `POST` to service including username and password.
2. AuthenticationService replies with a JWT provided the given credentials were correct.

### Authenticate request with Token
1. Application sends Http-request to Service with the token in the `Authorization` header
2. Other service sends `GET` request to its sidecar AuthenticationService containing the JWT.
3. AuthenticationService validates the JWT and responds accordingly
4. Other service executes

## API

The API has the following endpoints:

### /authenticate
- method: POST
- Body: 
    ```json 
    {
        "Username": "username",
        "Password": "password"
    }
    ```
- response:
  - credentials accepted: 200
      ```json
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjAsImlzcyI6Ikx1a2FzIiwiaWF0IjoxNjU2NTE0NjI3LCJleHAiOjE2NTcxMTk0Mjd9.E_-5sdCWkcmnvNsEZ6V0abVdJ8bGEZxJK4AkGrOacGYi5xptBh6evlGRQENJqmVSuI59--lccFeWExGbx3ougSezu_KGUH6BpT6g8hel8gLd1uuwvBqfdEqXPImZchckiIQlqELPxS-gMTghZgrjNJxDmID82A8i4bAS-k45KUZO-vFu3s-chTO7RaCmlApIlbhSm2cac96RPkPOj0jfBICSqTBHKaioCMUX_yeKN2qolPX2hNqSLNXcYmDpUpb-3LOVXVvEBujEZguBhstStasFFIzqo2NJGEUz7_dQgIjV9PwITUn0pbUbZ7KEA3kMAooPX7P5ZqnYOQjV6J5YK9-fLpvrw0pOx5c6ROOS9S_yFG1doDIxeTPv6qqS2Cth4iI01O_gDFvqG8c2xPVUarmHWGKNAWVtsu2qAj_Mcwy02W_F9qV6XUlZ2R84_szmfzJvEUDP22A9Nhv1ySro38_6wYZ56XhdZCqfBBi8lG-C3VCc-Nx3lGCQ0nfQ24o-iwGNYP0ElvAMxZfRJoO0uSeXCd2U14Yp586IyT_F2tOo55wlm8HD2gfxi3yXFn8ADQ_cNpsUu4Mwwp4LYCwYrYmjAq4V7d6ifIRwL1lqfGqmpp5UKXEBzCUbJJ8x7lvxytHT7kZBnZA6PDhPuwAnciKvsOuvawMRhhuAF0LV0Do"
      ```
  - credentials not accepted: 401
- example:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"Username": "Lukas", "Password": "yeet"}' http://localhost/authenticate
  ```

### /authenticate
- method: GET
- Header:
  ```
    Authorization: "BEARER <token>"
  ```
- response
  - Token valid: 200
    ```json
    {
      "uid": 2,
      "iss": "username",
      "iat": 1516239022,
      "exp": 1516256222
    }
    ```
  - Token invalid: 401
- example:
  ```bash
    curl -X GET -H "authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjAsImlzcyI6Ikx1a2FzIiwiaWF0IjoxNjU2NTE0NjI3LCJleHAiOjE2NTcxMTk0Mjd9.E_-5sdCWkcmnvNsEZ6V0abVdJ8bGEZxJK4AkGrOacGYi5xptBh6evlGRQENJqmVSuI59--lccFeWExGbx3ougSezu_KGUH6BpT6g8hel8gLd1uuwvBqfdEqXPImZchckiIQlqELPxS-gMTghZgrjNJxDmID82A8i4bAS-k45KUZO-vFu3s-chTO7RaCmlApIlbhSm2cac96RPkPOj0jfBICSqTBHKaioCMUX_yeKN2qolPX2hNqSLNXcYmDpUpb-3LOVXVvEBujEZguBhstStasFFIzqo2NJGEUz7_dQgIjV9PwITUn0pbUbZ7KEA3kMAooPX7P5ZqnYOQjV6J5YK9-fLpvrw0pOx5c6ROOS9S_yFG1doDIxeTPv6qqS2Cth4iI01O_gDFvqG8c2xPVUarmHWGKNAWVtsu2qAj_Mcwy02W_F9qV6XUlZ2R84_szmfzJvEUDP22A9Nhv1ySro38_6wYZ56XhdZCqfBBi8lG-C3VCc-Nx3lGCQ0nfQ24o-iwGNYP0ElvAMxZfRJoO0uSeXCd2U14Yp586IyT_F2tOo55wlm8HD2gfxi3yXFn8ADQ_cNpsUu4Mwwp4LYCwYrYmjAq4V7d6ifIRwL1lqfGqmpp5UKXEBzCUbJJ8x7lvxytHT7kZBnZA6PDhPuwAnciKvsOuvawMRhhuAF0LV0Do" http://localhost/authenticate
  ```