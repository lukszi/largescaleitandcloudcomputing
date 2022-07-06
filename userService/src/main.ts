import {Webserver} from "./web/webserver.ts";
import {Database} from "./data/database.ts";
import {dbConfig} from "./util/env.ts";
import {buildCreateUserEndpoint, buildDeleteUserEndpoint, buildGetUserEndpoint} from "./web/endpoints.ts";
import {HttpMethod, Operation, Route} from "./util/types.ts";

//Get DB connection from environment variables
console.log("Connecting to database...");
const db = new Database(dbConfig.dbHost, dbConfig.dbPort, dbConfig.dbUser, dbConfig.dbPassword, dbConfig.dbName);

console.log("Building Endpoints...");
// Create Routes
const createUserOperation: Operation = {
    execute: buildCreateUserEndpoint(db),
    authenticationRequired: false,
    operationName: "createUser"
};

const deleteUserOperation: Operation = {
    execute: buildDeleteUserEndpoint(db),
    authenticationRequired: true,
    operationName: "deleteUser"
};

const getUserOperation: Operation = {
    execute: buildGetUserEndpoint(db),
    authenticationRequired: true,
    operationName: "getUser"
}

const userRoute: Route = {
    pathMatcher: (url: string) => url.startsWith("/users"),
    operations: new Map<HttpMethod, Operation>([
        ["POST", createUserOperation],
        ["DELETE", deleteUserOperation],
        ["GET", getUserOperation]])
}

console.log("Starting webserver...");
//Setup webserver
const webServer = new Webserver(80);
webServer.addRoute(userRoute)
await webServer.start();