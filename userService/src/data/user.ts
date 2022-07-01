import * as bcrypt from "./deps.ts";

export class User {
    public readonly name: string;
    private id: number;
    public readonly pwHash: string;

    private constructor(name: string, id: number, hash: string) {
        this.name = name;
        this.id = id;
        this.pwHash = hash
    }

    private static isBCryptHash(str: string): boolean {
        return str.length == 60 && str.startsWith("$2b$");
    }

    public static async create(name: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password);
        return new User(name, 0, hash);
    }

    public static createFromDB(name: string, id: number, hash: string): User {
        return new User(name, id, hash);
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }
}