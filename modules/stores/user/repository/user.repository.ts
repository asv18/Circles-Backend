//define all actions to be performed in database
import database from "../../../../database.ts";
import User from "../dto/user.dto.ts";

class UserRepository {
    async getAll(): Promise<any> {
        return await database.queryArray(`SELECT * FROM "user";`)
    }

    async getByAuth(authID: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "user" WHERE "authID" = '${authID}';`)
    }

    async getByID(uuid: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "user" WHERE "id" = '${uuid}';`)
    }

    async create(user: User): Promise<any> {
        return await database.queryArray(`INSERT INTO "user" ("first_name", "last_name", "username", "password", "email", "registeredAt", "authID") VALUES ('${user.first_name}','${user.last_name}','${user.username}','${user.password}','${user.email}', DATE '${user.registeredAt}', '${user.authID}');`)
    }

    async update(user: User): Promise<any> {
        return await database.queryArray(`UPDATE "user" SET "first_name" = '${user.first_name}', "last_name" = '${user.last_name}', "username" = '${user.username}', "password" = '${user.password}'  WHERE "id" = '${user.id}';`)
    }

    async delete(id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "user" WHERE id = '${id}';`)
    }

}

export default new UserRepository();