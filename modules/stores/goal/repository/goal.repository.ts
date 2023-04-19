//define all actions to be performed in database
import database from "../../../../database.ts";
import Goal from "../dto/goal.dto.ts";

class GoalRepository {
    async getAll(uuid: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "goal" WHERE "owner" = '${uuid}' ORDER BY "finish_date" ASC;`)
    }

    async getByID(id: string, uuid: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "goal" WHERE "id" = '${id}' AND "owner" = '${uuid}';`)
    }

    async create(goal: Goal): Promise<any> {
        return await database.queryArray(`INSERT INTO "goal" ("name", "finish_date", "progress", "description", "owner") VALUES ('${goal.name}','${goal.finish_date}','0','${goal.description}','${goal.owner}') RETURNING "id";`)
    }

    async createTasks(insertString: string): Promise<any> {
        return await database.queryArray(`${insertString};`)
    }

    async update(goal: Goal): Promise<any> {
        return await database.queryArray(`UPDATE "goal" SET "name" = '${goal.name}', "finish_date" = '${goal.finish_date}', "progress" = '${goal.progress}', "description" = '${goal.description}'  WHERE "id" = '${goal.id}';`)
    }

    async delete(id: string, uuid: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "goal" WHERE "id" = '${id}' AND "owner" = '${uuid}';`)
    }
}

export default new GoalRepository();