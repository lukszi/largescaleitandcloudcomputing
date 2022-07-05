import {Webserver} from "./web/webserver.ts";
import {Database} from "./data/database.ts";
import {dbConfig} from "./util/env.ts";
import {buildCreateUserEndpoint, buildDeleteUserEndpoint} from "./web/endpoints.ts";
import {HttpMethod, Operation, Route} from "./util/types.ts";

//Get DB connection from environment variables
const db = new Database(dbConfig.dbHost, dbConfig.dbPort, dbConfig.dbUser, dbConfig.dbPassword, dbConfig.dbName);

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

const userRoute: Route = {
    pathMatcher: (url: string) => url.startsWith("/users"),
    operations: new Map<HttpMethod, Operation>([["POST", createUserOperation], ["DELETE", deleteUserOperation]])
}


//Setup webserver
const webServer = new Webserver(8080);
webServer.addRoute(userRoute)
await webServer.start();