import database from "../../../../../database.ts";
import Friendship from "../dto/friendship.dto.ts";
class FriendshipRepository {
    async getFriendshipsOfUser(foreignKey: string): Promise<any> {
    
        return await database.queryArray(`
            SELECT "id", "user1", "user2", "relationship", "date_created", CAST("last_interacted_date" AS STRING) FROM "friendship" WHERE ("user1"='${foreignKey}' OR "user2"='${foreignKey}') AND "relationship"='friends' ORDER BY "last_interacted_date";
        `)
    }

    async getFriendshipRequestsOfUser(foreignKey: string): Promise<any> {
        return await database.queryArray(`SELECT "id", "user1", "user2", "relationship", "date_created", CAST("last_interacted_date" AS STRING) FROM "friendship" WHERE ("user1"='${foreignKey}' OR "user2"='${foreignKey}') AND "relationship"='request';`)
    }

    async getFriendship(foreignKey1: string, foreignKey2: string): Promise<any> {
        return await database.queryArray(`SELECT "id", "user1", "user2", "relationship", CAST("date_created" AS STRING), CAST("last_interacted_date" AS STRING)
        FROM "friendship" WHERE ("user1"='${foreignKey1}' AND "user2"='${foreignKey2}') OR ("user2"='${foreignKey1}' AND "user1"='${foreignKey2}');`)
    }

    async createRequest(friendship: Friendship): Promise<any> {
        return await database.queryArray(`INSERT INTO "friendship" ("user1", "user2", "relationship") VALUES ('${friendship.user1}','${friendship.user2}','request');`)
    }

    async updateFriendship(friendship: Friendship): Promise<any> {
        return await database.queryArray(`UPDATE "friendship" SET "relationship" = '${friendship.relationship}', "last_interacted_date" = '${friendship.last_interacted_date}'  WHERE "id" = '${friendship.id}';`)
    }

    async delete(id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "friendship" WHERE "id" = '${id}';`)
    }
}

export default new FriendshipRepository();