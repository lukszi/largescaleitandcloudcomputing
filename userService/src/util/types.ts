export type Optional<T> = T | undefined;
export type Predicate<T> = (value: T) => boolean;
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type Endpoint = (req: Request, authToken: WebToken | undefined) => Promise<Response>;
export interface Route {
    pathMatcher: Predicate<string>;
    operations: Map<HttpMethod, Operation>;
}
export interface Operation {
    execute: Endpoint;
    authenticationRequired: boolean;
    authorizationRequired: boolean;
    operationName: string
}

export interface WebToken {
    uid: number;
    iat: number;
    iss: string;
    exp: number;
}