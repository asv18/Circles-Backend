import database from "../../../../../database.ts";
import Circle_Connection from "../dto/circle_connection.dto.ts";
import Circle from "../dto/circles.dto.ts";

class CirclesRepository {
    async getCirclesOfUser(userKey: string): Promise<any> {
        return await database.queryArray(`
            SELECT "id", CAST("created_at" AS STRING), CAST("last_interacted_date" AS STRING), "circle_name", "image", "created_by", "admin" FROM "circle_connection" circle_connection
            INNER JOIN "circle" c ON c.id = circle_connection.circle_id WHERE circle_connection.user_fkey = '${userKey}';
        `);
    }

    async getUsersOfCircle(circleID: string): Promise<any> {
        return await database.queryArray(`
            SELECT "first_name","last_name","username","photo_url","email","user_foreign_key" FROM "circle_connection" circle_connection INNER JOIN "user" u 
            ON u.user_foreign_key = circle_connection.user_fkey WHERE circle_connection.circle_id = '${circleID}';
        `);
    }

    async createCircleConnection(circle_connection: Circle_Connection): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "circle_connection" ("circle_id", "user_fkey") VALUES ('${circle_connection.circle_id}','${circle_connection.user_fkey}'); 
        `);
    }

    async createCircle(circle: Circle): Promise<any> {
        return await database.queryArray(`
            WITH "x" AS (INSERT INTO "circle" ("circle_name", "image", "created_by", "admin") VALUES ('${circle.circle_name}','${circle.image}','${circle.created_by}','${circle.admin}') RETURNING "id")
            INSERT INTO "circle_connection" ("circle_id", "user_fkey") VALUES ((SELECT "id" FROM "x"),'${circle.created_by}'); 
        `);
    }
}

export default new CirclesRepository()