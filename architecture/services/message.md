# ChatService

The ChatService provides all functionality regarding messages.
Messages always belong to a chat and are sent by a user.
Messages can be created, deleted, modified and retrieved.

The following endpoints exist:

## /chatMessages/{chatId}
Get all messages belonging to a given chat.
- method: get
- header:
  ```
    Authorization: "BEARER <token>"
  ```
- response:
    - credentials accepted: 200
        ```json
          [
              {
                 "chatId": 1,
                 "messageId": 1,
                 "message": "message",
                 "authorId": 1,
                 "time": "2020-01-01T00:00:00.000Z"
              },
              {
                 "chatId": 1,
                 "messageId": 2,
                 "message": "message2",
                 "authorId": 2,
                 "time": "2020-01-01T00:00:02.000Z"
              }
          ]
        ```
    - credentials not accepted: 401
- example:
  ```bash

  ```

## /message/{messageId}
Gets a message by its id.
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
            "messageId": 1,
            "message": "message",
            "authorId": 1,
            "time": "2020-01-01T00:00:00.000Z"
          }
        ```
    - credentials not accepted: 401
    - message not found: 404
- example:
  ```bash

  ```

## /message/{chatId}
Sends a message to a given chat.
- method: post
- body:
  ```json
  {
    "chatId": 1,
    "message": "message"
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
          "messageId": 1,
          "message": "message",
          "authorId": 1,
          "time": "2020-01-01T00:00:00.000Z"
        }
        ```
    - credentials not accepted: 401
- example:
  ```bash

  ```

## /message/{id}
Deletes a message from existence.
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
          "messageId": 1,
          "message": "message",
          "authorId": 1,
          "time": "2020-01-01T00:00:00.000Z"
        }
        ```
    - credentials not accepted: 401
    - message not found: 404
    - unauthorized: 403
- example:
  ```bash

  ```
