//define all actions to be performed in database
import database from "../../../../database.ts";
import User from "../dto/user.dto.ts";

class UserRepository {
    async getAll(query: string): Promise<any> {
        query = `LOWER('${query}')`

        return await database.queryArray(`
            SELECT "name","username","photo_url","email","user_foreign_key" FROM "user" WHERE (LOWER("name") ~ ${query} OR LOWER("username") ~ ${query}) LIMIT 10;
        `)
    }

    async getAllNotInCircle(query: string, circle_id: string): Promise<any> {
        query = `LOWER('${query}')`

        return await database.queryArray(`
            SELECT "name","username","photo_url","email","user_foreign_key" FROM "user" WHERE (LOWER("name") ~ ${query} OR LOWER("username") ~ ${query}) AND NOT EXISTS(SELECT 1 FROM "circle_connection" WHERE "user_fkey" = "user_foreign_key" AND "circle_id" = '${circle_id}') LIMIT 10;
        `)
    }

    async getByFKey(user_fkey: string): Promise<any> {
        return await database.queryArray(`
            SELECT "name","username","photo_url","email","user_foreign_key" FROM "user" WHERE "user_foreign_key" = '${user_fkey}';
        `)
    }

    async getByAuth(authID: string): Promise<any> {
        return await database.queryArray(`SELECT "id" FROM "user" WHERE "authID" = '${authID}';`)
    }

    async getFriendSkeletons(userKey: string): Promise<any> {
        return await database.queryArray(`SELECT "name", "username", "email", "user_foreign_key", "photo_url" FROM "friendship" friend 
            INNER JOIN "user" u ON u.user_foreign_key = friend.user1 OR u.user_foreign_key = friend.user2 
            WHERE friend.user2 = '${userKey}' OR friend.user1 = '${userKey}' ORDER BY "last_interacted_date" ASC;`)
    }

    async getByID(uuid: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "user" WHERE "id" = '${uuid}';`)
    }

    async create(user: User): Promise<any> {
        return await database.queryArray(`INSERT INTO "user" ("name", "username", "password", "email", "authID", "photo_url") VALUES ('${user.name}','${user.username}','${user.password}','${user.email}','${user.authID}','${user.photo_url}');`)
    }

    async update(user: User): Promise<any> {
        return await database.queryArray(`UPDATE "user" SET "name" = '${user.name}', "username" = '${user.username}', "photo_url" = '${user.photo_url}'  WHERE "id" = '${user.id}';`)
    }

    async delete(id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "user" WHERE id = '${id}';`)
    }

}

export default new UserRepository();