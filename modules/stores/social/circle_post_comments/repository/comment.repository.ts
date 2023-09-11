import database from "../../../../../database.ts";
import Comment from "../dto/comment.dto.ts";

class CommentRepository {
    async getComments(post_id: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", "poster_fkey", "contents", CAST("time_posted" AS STRING), "post_id", "parent_id", "likes"
            FROM "circle_post_comment" WHERE "post_id" = '${post_id}';
        `);
    }

    async createComment(comment: Comment): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "circle_post_comment" ("poster_fkey", "contents", "post_id", "parent_id")
            VALUES ('${comment.poster_fkey}', '${comment.contents}', '${comment.post_id}', ${comment.parent_id == undefined ? null : `'${comment.parent_id}'`});
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

    async likeComment(comment_id: string): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post_comment" SET "likes" = "likes" + 1 WHERE "id" = '${comment_id}';
        `);
    }

    async unlikeComment(comment_id: string): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post_comment" SET "likes" = "likes" - 1 WHERE "id" = '${comment_id}';
        `);
    }
}

export default new CommentRepository();