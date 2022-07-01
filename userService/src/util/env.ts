const authenticationServer = Deno.env.get("AUTHENTICATION_SERVER") || "http://auth:8080";
const dbConfig = {
    dbHost: Deno.env.get("DB_HOST") || "localhost",
    dbPort: parseInt(Deno.env.get("DB_PORT") || "5432"),
    dbUser: Deno.env.get("DB_USER") || "postgres",
    dbPassword: Deno.env.get("DB_PASSWORD") || "postgres",
    dbName: Deno.env.get("DB_NAME") || "users"
};

export {dbConfig, authenticationServer};
