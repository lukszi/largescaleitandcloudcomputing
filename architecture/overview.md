# Overview
This backend for chat applications is made up of the following microservices and Databases

## Microservices
### AuthenticationService
The [AuthenticationService](./services/authentication.md) provides authentication to the user and each of the other microservices. 

In order to do so, it runs as a standalone service and to reduce latency as a sidecar application for each service

## Databases