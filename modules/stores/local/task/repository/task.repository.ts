//define all actions to be performed in database
import database from "../../../../../database.ts";
import Task from "../dto/task.dto.ts";

class TaskRepository {
    async getAll(goal_id: string, user_id: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "task" WHERE "goal_id" = '${goal_id}' AND (SELECT exists (SELECT "id" FROM "goal" WHERE "id"='${goal_id}' AND "owner"='${user_id}' LIMIT 1));`)
    }

    async getByID(id: bigint, goal_id: string, user_id: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "task" WHERE "id" = ${id} AND "goal_id" = '${goal_id}' AND (SELECT exists (SELECT "id" FROM "goal" WHERE "id"='${goal_id}' AND "owner"='${user_id}' LIMIT 1));`)
    }

    async checkIfGoalExists(user_id: string, goal_id: string): Promise<any> {
        const body = await database.queryArray(`
            SELECT exists (SELECT "id" FROM "goal" WHERE "owner"='${user_id}' AND "id"='${goal_id}');
        `);
        return body;
    }

    async create(task: Task): Promise<any> {
        return await database.queryArray(`
            INSERT INTO "task" ("name", "goal_id", "repeat", "next_date") VALUES ('${task.name}', '${task.goal_id}', '${task.repeat}','${task.next_date}');
        `)
    }

    async update(task: Task, user_id: string): Promise<any> {
        //console.log(`UPDATE "task" SET "name" = '${task.name}', "repeat" = '${task.repeat}', "next_date" = '${task.next_date.toString()}', "complete" = '${task.complete}' WHERE "id" = ${task.id} AND "goal_id" = '${task.goal_id}';`)

        return await database.queryArray(`UPDATE "task" SET "name" = '${task.name}', "repeat" = '${task.repeat}', "next_date" = '${task.next_date}', "complete" = '${task.complete}' WHERE "id" = ${task.id} AND "goal_id" = '${task.goal_id}' AND (SELECT exists (SELECT "id" FROM "goal" WHERE "id"='${task.goal_id}' AND "owner"='${user_id}' LIMIT 1));`)
    }

    async delete(id: bigint, goal_id: string, user_id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "task" WHERE "id" = ${id} AND "goal_id" = '${goal_id}' AND (SELECT exists (SELECT "id" FROM "goal" WHERE "id"='${goal_id}' AND "owner"='${user_id}' LIMIT 1));`)
    }
}

export default new TaskRepository();