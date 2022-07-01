import {Webserver} from "./webserver.ts";
import {Database} from "./data/database.ts";
import {dbConfig} from "./util/env.ts";

//Get DB connection from environment variables
const db = new Database(dbConfig.dbHost, dbConfig.dbPort, dbConfig.dbUser, dbConfig.dbPassword, dbConfig.dbName);

//Setup webserver
const webServer = new Webserver(8080);
await webServer.start();