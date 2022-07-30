// USED IN PART 2
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');

class Database {

    constructor(database) {
        if (typeof database === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this._database = database;
    }

    static async _init() {
        const database = new Sequelize({
            dialect: 'sqlite',
            storage: path.join(__dirname, '..', '..', '..', 'database', 'webengDB.db')
        });

        try {
            await database.authenticate();
            console.log("Connection has been established successfully.");
        } catch (err) {
            console.error("Connection could not be established.", err);
        }

        return database;
    }

    static async getInstance() {
        // check if Database instance already exists
        if(!Database.instance){
            const database = await Database._init();
            
            Database.instance = new Database(database);            
        }
        return Database.instance;
    }

    async validateUser(user, passwd){
        if (!(await this.userExists(user))) {
            throw new Error(`User ${user} doesn't exist.`);
        }

        const db = this._database;

        try {
            const db_user = await db.query("SELECT password FROM users WHERE username=:user", {
                replacements: {
                    user: user,
                    password: passwd
                },
                type: Sequelize.QueryTypes.SELECT
            });
            if (db_user.length != 0) {
                const result = await bcrypt.compare(passwd, db_user["0"].password)
                if (result) {
                    return true;
                } else {
                    console.log("Wrong password")
                    return false;                    
                }
            }
            return false;
        } catch (err) {
            console.log(`${err}`)
            // throw new Error(`User ${user} doesn't exist.`);
            return false;
        }
    }

    async userExists(user) {
        if (typeof user === 'undefined') {
            console.log('user is undefined');
            return false;
        }
        
        const db = this._database;

        try {
            const db_user = await db.query("SELECT * FROM users WHERE username=:user", {
                replacements: {
                    user: user
                },
                type: Sequelize.QueryTypes.SELECT
            });
    
            if (db_user.length != 0) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("user not found", err);
            return false;
        }
    }

    async registerUser(user, passwd) {
        if (await this.userExists(user)) {
            throw new Error("user already exists")
        }

        const db = this._database;
        
        const salting_rounds = 7
        const hash = await bcrypt.hash(passwd, salting_rounds);
        await db.query("INSERT INTO users(username, password, grade) VALUES(:user, :password, :grade)", {
            replacements: {
                user: user,
                password: hash,
                grade: 1
            },
            type: Sequelize.QueryTypes.INSERT
        });
        return
    }

    async getStudent(user) {
        const db = this._database;
        try {
            const db_user = await db.query("SELECT grade FROM users WHERE username=:user", {
                replacements: {
                    user: user
                },
                type: Sequelize.QueryTypes.SELECT
            });
            if (db_user.length != 0)
                return new student(user, db_user["0"].grade);
        } catch (err) {
            console.log(err)
            return null;
        }
        return null;
    }


}

module.exports = Database
