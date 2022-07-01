import {User} from "./user.ts";
import {Pool, PoolClient, QueryClient, Transaction} from "./deps.ts";
import {UserNotFoundException} from "./exceptions.ts";

export class Database {
    private pool: Pool;

    constructor(host: string, port: number, user: string, password: string, dbName: string) {
        const config = {
            user: user,
            database: dbName,
            hostname: host,
            port: port,
            password: password,
        };
        this.pool = new Pool(config, 3);
    }

    /**
     * Wraps query method in database connection
     *
     * @param queryFunc function to wrap
     * @returns result of queryFunc
     */
    private async wrapQuery(queryFunc: (client: QueryClient) => Promise<User>): Promise<User> {
        const connection: PoolClient = await this.pool.connect();
        try {
            return await queryFunc(connection);
        } finally {
            connection.release()
        }
    }

    /**
     * Gets single user by id
     *
     * @throws UserNotFoundException if user with id does not exist
     * @param id id of user to get
     */
    public getUserById(id: number): Promise<User> {
        const queryMethod = async (connection: QueryClient) => {
            const results = await connection.queryObject<{ user_id: number, name: string, password: string }>
                `SELECT user_id, name, password
                 FROM users.users
                 WHERE user_id = ${id}`;

            if (results.rows.length == 0) {
                throw new UserNotFoundException("User with id " + id + " not found");
            } else {
                const dbUser = results.rows[0];
                return User.createFromDB(dbUser.name, dbUser.user_id, dbUser.password);
            }
        }
        return this.wrapQuery(queryMethod);
    }

    /**
     * Gets single user by name
     *
     * @throws UserNotFoundException if user with name does not exist
     * @param name name of user to get
     */
    public getUserByName(name: string): Promise<User> {
        const queryMethod = async (connection: QueryClient) => {
            const results = await connection.queryObject<{ user_id: number, name: string, password: string }>
                `SELECT user_id, name, password
                 FROM users.users
                 WHERE name = ${name}`;

            if (results.rows.length == 0) {
                throw new UserNotFoundException("User with name " + name + " not found");
            } else {
                const dbUser = results.rows[0];
                return User.createFromDB(dbUser.name, dbUser.user_id, dbUser.password);
            }
        }
        return this.wrapQuery(queryMethod);
    }

    /**
     * Creates new user in database
     *
     * @param user user to create in database
     * @returns user with id set
     */
    public createUser(user: User): Promise<User> {
        return this.wrapQuery(
            async (connection: QueryClient) =>
            {
                const results = await Database.wrapQueryTransactional(connection,
                    async (transaction: Transaction) =>
                    {
                        return await transaction.queryObject<{ user_id: number, name: string, password: string }>
                            `INSERT into users.users (name, password)
                             values (${user.name}, ${user.pwHash})
                             RETURNING user_id, name, password`
                    })
                const dbUser = results.rows[0];
                return User.createFromDB(dbUser.name, dbUser.user_id, dbUser.password);
            });
    }

    private static async wrapQueryTransactional<T>(connection: QueryClient, queryFunc: (transaction: Transaction) => Promise<T>): Promise<T> {
        const transaction = connection.createTransaction("insert_user");
        try {
            await transaction.begin();
            const result: T = await queryFunc(transaction);
            await transaction.commit();
            return result;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}