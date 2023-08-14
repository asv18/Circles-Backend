import database from "../../../../../database.ts";
import Message from "../dto/message.dto.ts";

class MessageRepository {
    async getChunk(friendshipID: string, offset: bigint): Promise<any> {
        return await database.queryArray(`SELECT "id", "contents", "friendship_id", CAST("time_sent" AS STRING), "reply_id", "user_fkey" FROM "conversation_message" WHERE "friendship_id"='${friendshipID}' ORDER BY "time_sent" DESC OFFSET ${offset} ROWS FETCH NEXT 20 ROWS ONLY;`)
    }

    async create(message: Message): Promise<any> {
        return await database.queryArray(`INSERT INTO "conversation_message" ("contents", "friendship_id", "reply_id", "user_fkey") VALUES ('${message.contents}',${message.friendship_id},${message.reply_id == undefined ? "null" : message.reply_id},'${message.user_fkey}') RETURNING "id", "contents", "friendship_id", CAST("time_sent" AS STRING), "reply_id", "user_fkey";`);
    }
}

export default new MessageRepository();