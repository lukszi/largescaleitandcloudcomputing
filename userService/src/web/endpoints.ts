import {User} from "../data/user.ts";
import {Database} from "../data/database.ts";
import {WebToken} from "../util/types.ts";
import {UserAlreadyExistsException, UserNotFoundException} from "../util/exceptions.ts";
import {urlParse} from "https://deno.land/x/url_parse@1.1.0/mod.ts";

export function buildCreateUserEndpoint(db: Database): (req: Request, tokenDetails?: WebToken) => Promise<Response>{
    return async function createUser(req: Request): Promise<Response> {
        // check if req is null
        if (req == null) {
            throw new Response("Request is null", {status: 500});
        }

        const body = await req.json();
        const modelUser = await User.create(body.name, body.password);
        try {
            const dbUser = await db.createUser(modelUser);
            return new Response(dbUser.toJson(), {status: 201});
        }
        catch (e) {
            if (e instanceof UserAlreadyExistsException) {
                return new Response("User already exists", {status: 409});
            }
            else {
                throw new Response("Failed to create user", {status: 500});
            }
        }
    }
}

export function buildDeleteUserEndpoint(db: Database): (req: Request, tokenDetails?: WebToken) => Promise<Response>{
    return async function deleteUser(req: Request, tokenDetails ): Promise<Response> {
        // check if req is null
        if (req == null) {
            throw new Response("Request is null", {status: 500});
        }
        const userId: number = parseInt(urlParse(req.url).pathname.split("/").reverse()[0]);
        const uid: number = parseInt(req.url.split('/').reverse()[0]);
        throw new Response(`uid: ${uid} userId: ${userId}`, {status: 404});

        // Authorize request
        if (tokenDetails == null) {
            throw new Response("Authorization failed", {status: 500});
        }
        if (tokenDetails.uid != userId) {
            return new Response("Unauthorized", {status: 401});
        }

        // Delete user
        try {
            const dbUser = await db.deleteUser(userId);
            return new Response(dbUser.toJson(), {status: 200});
        }
        catch (e) {
            if (e instanceof UserNotFoundException) {
                return new Response("User not found", {status: 404});
            }
            else {
                throw new Response("Failed to delete user", {status: 500});
            }
        }
    }
}

export function buildGetUserEndpoint(db: Database): (req: Request, tokenDetails?: WebToken) => Promise<Response>{
    return async function getUser(req: Request, tokenDetails?: WebToken): Promise<Response> {
        // check if req is null
        if (req == null) {
            throw new Response("Request is null", {status: 500});
        }
        const userId: number = parseInt(urlParse(req.url).pathname.split("/").reverse()[0]);
        const uid: number = parseInt(req.url.split('/').reverse()[0]);
        throw new Response(`uid: ${uid} userId: ${userId}`, {status: 404});


        // Authorize request
        if (tokenDetails == null) {
            throw new Response("Authorization failed", {status: 500});
        }

        // Get user
        try {
            const dbUser = await db.getUserById(userId);
            return new Response(dbUser.toJson(), {status: 200});
        }
        catch (e) {
            if (e instanceof UserNotFoundException) {
                return new Response("User not found", {status: 404});
            }
            else {
                throw new Response("Failed to get user", {status: 500});
            }
        }
    }
}