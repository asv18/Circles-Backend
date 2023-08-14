//define all actions to be performed in database
import database from "../../../../database.ts";
import User from "../dto/user.dto.ts";

class UserRepository {
    async getAll(query: string): Promise<any> {
        query = `LOWER('${query}')`

        return await database.queryArray(`
            SELECT "first_name","last_name","username","photo_url","email","user_foreign_key" FROM "user" WHERE (LOWER("first_name") ~ ${query} OR LOWER("last_name") ~ ${query}) LIMIT 10;
        `)
    }

    async getByAuth(authID: string): Promise<any> {
        return await database.queryArray(`SELECT "id" FROM "user" WHERE "authID" = '${authID}';`)
    }

    async getFriendSkeletons(userKey: string): Promise<any> {
        return await database.queryArray(`SELECT "first_name", "last_name", "username", "email", "user_foreign_key", "photo_url" FROM "friendship" friend 
            INNER JOIN "user" u ON u.user_foreign_key = friend.user1 OR u.user_foreign_key = friend.user2 
            WHERE friend.user2 = '${userKey}' OR friend.user1 = '${userKey}' ORDER BY "last_interacted_date" ASC;`)
    }

    async getByID(uuid: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "user" WHERE "id" = '${uuid}';`)
    }

    async create(user: User): Promise<any> {
        return await database.queryArray(`INSERT INTO "user" ("first_name", "last_name", "username", "password", "email", "authID", "photo_url") VALUES ('${user.first_name}','${user.last_name}','${user.username}','${user.password}','${user.email}','${user.authID}','${user.photo_url}');`)
    }

    async update(user: User): Promise<any> {
        return await database.queryArray(`UPDATE "user" SET "first_name" = '${user.first_name}', "last_name" = '${user.last_name}', "username" = '${user.username}', "password" = '${user.password}', "photo_url" = '${user.photo_url}'  WHERE "id" = '${user.id}';`)
    }

    async delete(id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "user" WHERE id = '${id}';`)
    }

}

export default new UserRepository();