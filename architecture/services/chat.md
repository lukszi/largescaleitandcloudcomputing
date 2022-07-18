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
    curl --location --request GET 'http://localhost:8080/chat'\
    --header 'Authorization: Bearer <token>'
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
  curl --location --request POST 'http://localhost:8080/chat' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '  {
  "chatName": "chat",
  "participants": [1, 2, 3, 4]
  }'
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
    curl --location --request GET 'http://localhost:8080/chat/4' \
    --header 'Authorization: Bearer <token>'
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
    curl --location --request DELETE 'http://localhost:8080/chat/4' \
    --header 'Authorization: Bearer <token>'
  ```
