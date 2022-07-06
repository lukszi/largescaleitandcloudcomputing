import {User} from "./user.ts";
import {Pool, PoolClient, QueryClient, Transaction, TransactionError} from "../deps.ts";
import {UserAlreadyExistsException, UserNotFoundException} from "../util/exceptions.ts";

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
        try{
            this.pool = new Pool(config, 3);
        }
        catch(e){
            console.log("Could not connect to database");
            console.log("host: " + host);
            console.log("port: " + port);
            console.log("user: " + user);
            console.log("password: " + password);
            console.log("dbName: " + dbName);
            console.log(e);
            throw new Error(e);
        }
    }

    /**
     * Wraps query method in database connection
     *
     * @param queryFunc function to wrap
     * @returns result of queryFunc
     */
    private async wrapQuery<T>(queryFunc: (client: QueryClient) => Promise<T>): Promise<T> {
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
    public async createUser(user: User): Promise<User> {
        let createdUser: User;
        try {
            createdUser = await this.wrapQuery(async (connection: QueryClient) => {
                const results = await Database.wrapQueryTransactional(connection,
                    async (transaction: Transaction) => {
                        return await transaction.queryObject<{ user_id: number, name: string, password: string }>
                            `INSERT into users.users (name, password)
                             values (${user.name}, ${user.pwHash})
                             RETURNING user_id, name, password`
                    })
                const dbUser = results.rows[0];
                return User.createFromDB(dbUser.name, dbUser.user_id, dbUser.password);
            });
        } catch (e) {
            if (e instanceof TransactionError) {
                throw new UserAlreadyExistsException("User with name " + user.name + " already exists");
            } else {
                throw e;
            }
        }

        return createdUser;
    }

    private static async wrapQueryTransactional<T>(connection: QueryClient, queryFunc: (transaction: Transaction) => Promise<T>): Promise<T> {
        const transaction = connection.createTransaction("insert_user");
        let result: T;
        try {
            await transaction.begin();
            result = await queryFunc(transaction);
            await transaction.commit();
        } catch (e) {
            // Pass along transaction errors
            if (e instanceof TransactionError) {
                throw e;
            }
            // Rollback on any other error and output for debugging
            else {
                console.log(e)
                await transaction.rollback();
                throw e;
            }
        }
        return result;
    }

    public async deleteUser(id: number): Promise<User> {
        return await this.wrapQuery(async (connection: QueryClient) => {
            return await Database.wrapQueryTransactional(connection, async (transaction: Transaction) => {
                const result = await transaction.queryObject<{ user_id: number, name: string, password: string }>
                    `DELETE from users.users
                     WHERE user_id = ${id}`;

                // Check if results are empty
                if (result.rows.length == 0) {
                    throw new UserNotFoundException("User with id " + id + " not found");
                }
                const deletedDbUser = result.rows[0];
                return User.createFromDB(deletedDbUser.name, deletedDbUser.user_id, deletedDbUser.password);
            })
        }
        );
    }


}