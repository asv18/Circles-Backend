import database from "../../../../../database.ts";
import CircleConnection from "../dto/circle_connection.dto.ts";
import Circle from "../dto/circles.dto.ts";

class CirclesRepository {
    async getAvailableCircles(offset: number, query: string, user_fkey: string): Promise<any> {
        query = `LOWER('${query}')`;

        return await database.queryArray(`
            SELECT "id", CAST("created_at" AS STRING), CAST("last_interacted_date" AS STRING), "circle_name",
            "image", "created_by", "admin", "publicity" FROM "circle" WHERE
            "publicity" = 'public' AND (LOWER("circle_name") ~ ${query}) AND
            NOT EXISTS(SELECT 1 FROM "circle_connection" WHERE "user_fkey" = '${user_fkey}' AND "circle_id" = "id")
            OFFSET ${offset} FETCH NEXT 10 ROWS ONLY;
        `);
    }

    async getCirclesOfUser(userKey: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", CAST("created_at" AS STRING), CAST("last_interacted_date" AS STRING), "circle_name",
            "image", "created_by", "admin", "publicity",
            (SELECT COUNT(*) FROM "circle_post_connection" AS INT8 WHERE "circle_id" = c."id") AS "post_count"
            FROM "circle_connection" circle_connection INNER JOIN "circle" c ON c.id = circle_connection.circle_id WHERE circle_connection.user_fkey = '${userKey}';
        `);
    }

    async getCircleById(circleID: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", CAST("created_at" AS STRING), CAST("last_interacted_date" AS STRING), "circle_name",
            "image", "created_by", "admin", "publicity",
            (SELECT COUNT(*) FROM "circle_post_connection" AS INT8 WHERE "circle_id" = '${circleID}') AS "post_count" 
            FROM "circle" WHERE "id"='${circleID}';
        `);
    }

    async getUsersOfCircle(circleID: string): Promise<any> {
        return await database.queryArray(`
            SELECT "name","username","photo_url","email","user_foreign_key" FROM "circle_connection" circle_connection INNER JOIN "user" u 
            ON u.user_foreign_key = circle_connection.user_fkey WHERE circle_connection.circle_id = '${circleID}';
        `);
    }

    async createCircleConnection(circle_connection: CircleConnection): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "circle_connection" ("circle_id", "user_fkey") VALUES ('${circle_connection.circle_id}','${circle_connection.user_fkey}'); 
        `);
    }

    async createCircle(circle: Circle): Promise<any> {
        return await database.queryArray(`
            WITH "x" AS (INSERT INTO "circle" ("circle_name", "image", "created_by", "admin", "publicity") VALUES ('${circle.circle_name}','${circle.image}','${circle.created_by}','${circle.admin}','${circle.publicity?.toLowerCase()}') RETURNING "id")
            INSERT INTO "circle_connection" ("circle_id", "user_fkey") VALUES ((SELECT "id" FROM "x"),'${circle.created_by}'); 
        `);
    }

    async deleteCircle(id: string, user_fkey: string, user_id: string): Promise<any> {
        return await database.queryArray(`
            DELETE FROM "circle" WHERE "id"='${id}' AND "admin" = '${user_fkey}'
            AND EXISTS(SELECT 1 FROM "user" WHERE "user_foreign_key"='${user_fkey}' AND "id"='${user_id}');
        `);
    }

    async deleteCircleConnection(id: string, user_fkey: string): Promise<any> {
        return await database.queryArray(`
            DELETE FROM "circle_connection" WHERE "circle_id"='${id}' AND "user_fkey"='${user_fkey}';
        `);
    }

    async checkAdmin(circle_id: string, user_fkey: string): Promise<any> {
        return await database.queryArray(`
            SELECT EXISTS (SELECT 1 FROM "circle" WHERE "id"='${circle_id}' AND "admin"='${user_fkey}');
        `);
    }

    async updateCircleAdmin(circle_id: string, user_fkey: string): Promise<any> {
        return await database.queryArray(`
            UPDATE "circle" SET "user_fkey" = '${user_fkey}' WHERE "id" = '${circle_id}';
        `);
    }

    async userGetFirst(circle_id: string): Promise<any> {
        return await database.queryArray(`
            SELECT "user_foreign_key" FROM "circle_connection" circle_connection INNER JOIN "user" u
            ON u.user_foreign_key = circle_connection.user_fkey WHERE circle_connection.circle_id = '${circle_id}' LIMIT 1;
        `);
    }
}

export default new CirclesRepository()