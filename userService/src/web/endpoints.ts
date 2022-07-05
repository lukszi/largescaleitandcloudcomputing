import {User} from "../data/user.ts";
import {Database} from "../data/database.ts";
import {WebToken} from "../util/types.ts";
import {UserAlreadyExistsException} from "../util/exceptions.ts";

export function buildCreateUserEndpoint(db: Database): (req: Request, tokenDetails?: WebToken) => Promise<Response>{
    return async function createUser(req: Request): Promise<Response> {
        // check if req is null
        if (req == null) {
            throw new Error("Request is null");
        }

        // get json from request
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