import database from "../../../../../database.ts";
import CirclePostConnection from "../dto/circle_post_connection.dto.ts";
import CirclePost from "../dto/circle_posts.dto.ts";

class CirclePostsRepository {
    async getCirclePosts(circle_id: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", "poster_fkey", "title", "image", "description", "goal_id", "task_id", "likes", CAST("posted_at" as STRING), "connection_id" FROM "circle_post_connection" circle_post_connection INNER JOIN "circle_post" c 
            ON c.id = circle_post_connection.post_id WHERE circle_post_connection.circle_id = '${circle_id}';
        `);
    }

    async createCirclePost(post: CirclePost): Promise<any> {
        //${post.task_id == undefined ? null : `'${post.task_id}'`}
        return await database.queryArray(`
            INSERT INTO "circle_post" ("title", "description", "image", "poster_fkey", "goal_id", "task_id")
            VALUES ('${post.title}', '${post.description}', ${post.image == undefined ? null : `'${post.image}'`}, '${post.poster_fkey}', ${post.goal_id == undefined ? null : `'${post.goal_id}'`}, ${post.task_id == undefined ? null : `'${post.task_id}'`}) RETURNING "id";
        `);
    }

    async createCirclePostConnection(postConnection: CirclePostConnection) {
        return await database.queryArray(`
            INSERT INTO "circle_post_connection" ("circle_id", "post_id")
            VALUES ('${postConnection.circle_id}', '${postConnection.post_id}');
        `);
    }

    async getUserPosts(userKey: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "circle_post" WHERE "poster_fkey"='${userKey}'`)
    }

    async likePost(connection_id: string): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post_connection"
            SET "likes" = "likes" + 1
            WHERE "connection_id" = '${connection_id}';
        `)
    }

    async unlikePost(connection_id: string): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post_connection"
            SET "likes" = "likes" - 1
            WHERE "connection_id" = '${connection_id}';
        `)
    }

    async updatePost(new_post: CirclePost): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle_post" 
            SET "title" = '${new_post.title}', "description" = '${new_post.description}', "image" = '${new_post.image}'
            WHERE "id" = '${new_post.id}';
        `);
    }

    async deleteCirclePost(circlepost_id: string, circle_id: string): Promise<any> {
        return await database.queryArray(`
            DELETE FROM "circle_post" WHERE "id"='${circlepost_id}' AND (SELECT exists (SELECT "id" FROM "circle_post_connection" WHERE "circle_id"='${circle_id}' AND "post_id"='${circlepost_id}' LIMIT 1));
        `);
    }
}

export default new CirclePostsRepository();