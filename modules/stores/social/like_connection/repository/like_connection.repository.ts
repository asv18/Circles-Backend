import database from "../../../../../database.ts";
import LikeConnection from "../dto/like_connection.dto.ts";

class LikeConnectionRepository {
    async getLike(user_fkey: string, post_connection_id?: string, comment_id?: string): Promise<any> {
        return await database.queryArray(`
            SELECT * FROM "like_connection" WHERE "user_fkey" = '${user_fkey}' AND "post_connection_id" ${post_connection_id == undefined ? 'IS NULL' : `= '${post_connection_id}'`} AND "comment_id" ${comment_id == undefined ? 'IS NULL' : `= '${comment_id}'`};
        `);
    }

    async checkLike(user_fkey: string, post_connection_id?: string, comment_id?: string): Promise<any> {
        return await database.queryArray(`
            SELECT exists (SELECT * FROM "like_connection" WHERE "user_fkey" = '${user_fkey}' AND "post_connection_id" ${post_connection_id == undefined ? 'IS NULL' : `= '${post_connection_id}'`} AND "comment_id" ${comment_id == undefined ? 'IS NULL' : `= '${comment_id}'`});
        `);
    }

    async createLike(like: LikeConnection): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "like_connection" ("user_fkey", "comment_id", "post_connection_id", "like_status")
            VALUES ('${like.user_fkey}', ${like.comment_id == undefined ? null : `'${like.comment_id}'`}, 
            ${like.post_connection_id == undefined ? null : `'${like.post_connection_id}'`}, 'liked');
        `);
    }

    async updateLike(like: LikeConnection): Promise<any> {
        return await database.queryArray(`
            UPDATE "like_connection" SET "like_status" = '${like.like_status}' WHERE "id" = '${like.id}' AND "user_fkey" = '${like.user_fkey}';
        `);
    }

    async deleteLike(like_id: string): Promise<any> {
        return await database.queryArray(`
            DELETE FROM "like_connection" WHERE "id" = '${like_id}';
        `);
    }
}

export default new LikeConnectionRepository();