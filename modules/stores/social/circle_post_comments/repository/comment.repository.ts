import database from "../../../../../database.ts";
import Comment from "../dto/comment.dto.ts";

class CommentRepository {
    async getComments(post_connection_id: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", "poster_fkey", "contents", CAST("time_posted" AS STRING), "post_connection_id", "parent_id",
            (SELECT COUNT(*) FROM "like_connection" AS INT8 WHERE "comment_id" = "circle_post_comment"."id" AND "like_status" = 'liked') AS "likes"
            FROM "circle_post_comment"
            WHERE "post_connection_id" = '${post_connection_id}' AND "parent_id" IS NULL;
        `);
    }

    async getChildren(post_connection_id: string, comment_id: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", "poster_fkey", "contents", CAST("time_posted" AS STRING), "post_connection_id", "parent_id",
            (SELECT COUNT(*) FROM "like_connection" AS INT8 WHERE "comment_id" = "circle_post_comment"."id" AND "like_status" = 'liked') AS "likes"
            FROM "circle_post_comment"
            WHERE "post_connection_id" = '${post_connection_id}' AND "parent_id" = '${comment_id}';
        `);
    }

    async createComment(comment: Comment): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "circle_post_comment" ("poster_fkey", "contents", "post_connection_id", "parent_id")
            VALUES ('${comment.poster_fkey}', '${comment.contents}', '${comment.post_connection_id}', ${comment.parent_id == undefined ? null : `'${comment.parent_id}'`})
            RETURNING "id", "poster_fkey", "contents", CAST("time_posted" AS STRING), "post_connection_id", "parent_id",
            (SELECT COUNT(*) FROM "like_connection" AS INT8 WHERE "comment_id" = "circle_post_comment"."id" AND "like_status" = 'liked') AS "likes";
        `);
    }

    async updateComment(new_comment: Comment): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post_comment" SET "contents" = '${new_comment.contents}'
            WHERE "id" = '${new_comment.id}' AND "poster_fkey" = '${new_comment.poster_fkey}';
        `);
    }

    async deleteComment(comment_id: string): Promise<any> {
        return await database.queryArray(`
            DELETE FROM "circle_post_comment" WHERE "id" = '${comment_id}';
        `);
    }
}

export default new CommentRepository();