import {serve, urlParse} from "../deps.ts";
import {HttpMethod, Operation, Optional, Route, WebToken} from "../util/types.ts";
import {authenticationServer} from "../util/env.ts";
import {UnauthorizedRequestException} from "../util/exceptions.ts";

export class Webserver{
    private readonly port: number;
    private handlerRegistry: Route[];

    constructor(port: number){
        this.port = port;
        this.handlerRegistry = [];
    }

    async start(){
        console.log(`Webserver started on port ${this.port}`);
        await serve(this.requestHandler, {port: this.port});
    }

    /**
     * Dispatches request to appropriate handler
     *
     * @param req request to be dispatched
     */
    private async requestHandler(req: Request): Promise<Response>{
        const parsedUrl = urlParse(req.url);
        const path = parsedUrl.pathname;
        const method: HttpMethod = <HttpMethod>req.method;

        // Find route that matches request
        const matchingRoutes = this.handlerRegistry.filter(handler => handler.pathMatcher(path));
        if(matchingRoutes.length == 0){
            return new Response("Not found", {status: 404});
        }
        if(matchingRoutes.length > 1){
            return new Response("Multiple matching routes found", {status: 500});
        }
        const matchedRoute: Route = matchingRoutes[0];

        // Check if route supports method
        const endPoint: Optional<Operation> = matchedRoute.operations.get(method);
        if(!endPoint){
            return new Response("Method not allowed", {status: 405});
        }

        // Authenticate request if need be
        if(endPoint.authenticationRequired){
            const tokenDetails = await Webserver.authenticateRequest(req);
            return await endPoint.execute(req, tokenDetails);
        }
        return await endPoint.execute(req, undefined);
    }

    /**
     * Authenticates a request and returns the User who sent this request
     * @param originalReq request to be authenticated
     * @returns Body of the token if authentication was successful
     * @throws UnauthorizedRequestException if authentication failed
     */
    private static async authenticateRequest(originalReq: Request): Promise<WebToken>{
        const authorization = originalReq.headers.get("Authorization");
        if(!authorization){
            throw new UnauthorizedRequestException("No authorization header");
        }

        const req = new Request(authenticationServer, {method: "GET", headers: {Authorization: authorization}});
        const resp = await fetch(req);
        if(resp.status != 200){
            throw new UnauthorizedRequestException("Authentication server returned error");
        }
        return await resp.json();
    }

    /**
     * Adds new route
     */
    public addRoute(route: Route): void{
        this.handlerRegistry.push(route);
    }
}
