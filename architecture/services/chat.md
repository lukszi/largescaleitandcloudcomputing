# ChatService

The ChatService provides all functionality regarding chats.
Chats in this case, refer not to the messages, but to the groups that contain messages.
Chats can be created, deleted, modified and retrieved.

The following endpoints exist:

## /chat
Get all chats the current user is part of as a list of chat ids.
- method: get
- header:
  ```
    Authorization: "BEARER <token>"
  ```
- response:
    - credentials accepted: 200
        ```json
          [1, 2, 3]
        ```
    - credentials not accepted: 401
- example:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"Username": "Lukas", "Password": "yeet"}' http://localhost/authenticate
  ```

## /chat
Creates a chat with a name and a given list of participants by their ids.
- method: post
- body:
  ```json
  {
    "chatName": "name",
    "participants": [1, 2, 3, 4]
  }
  ```
- header:
  ```
    Authorization: "BEARER <token>"
  ```
- response:
    - credentials accepted: 200
        ```json
          {
            "chatId": 1,
            "chatName": "name",
            "participants": [1, 2, 3, 4]
          }
        ```
    - credentials not accepted: 401
- example:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"Username": "Lukas", "Password": "yeet"}' http://localhost/authenticate
  ```

## /chat/{id}
Returns a chat by its id and all users who are part of it.
- method: get
- header:
  ```
    Authorization: "BEARER <token>"
  ```
- response:
    - credentials accepted: 200
        ```json
          {
            "chatId": 1,
            "chatName": "name",
            "users": [1, 2, 3, 4]
          }
        ```
    - credentials not accepted: 401
    - chat not found: 404
- example:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"Username": "Lukas", "Password": "yeet"}' http://localhost/authenticate
  ```

## /chat/{id}
Deletes a chat from existence, messages will not be deleted.
- method: delete
- header:
  ```
    Authorization: "BEARER <token>"
  ```
- response:
    - credentials accepted: 200
        ```json
          {
            "chatId": 1,
            "chatName": "name",
            "users": [1, 2, 3, 4]
          }
        ```
    - credentials not accepted: 401
    - chat not found: 404
    - unauthorized: 403
- example:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"Username": "Lukas", "Password": "yeet"}' http://localhost/authenticate
  ```
