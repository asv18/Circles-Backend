//define all actions to be performed in database
import database from "../../../../database.ts";
import Task from "../dto/task.dto.ts";

class TaskRepository {
    async getAll(goal_id: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "task" WHERE "goal_id" = '${goal_id}';`)
    }

    async getByID(id: bigint, goal_id: string): Promise<any> {
        return await database.queryArray(`SELECT * FROM "task" WHERE "id" = ${id} AND "goal_id" = '${goal_id}';`)
    }

    async create(task: Task): Promise<any> {
        return await database.queryArray(`INSERT INTO "task" ("name", "goal_id", "repeat", "next_date") VALUES ('${task.name}', '${task.goal_id}', '${task.repeat}','${task.next_date}');`)
    }

    async update(task: Task): Promise<any> {
        //console.log(`UPDATE "task" SET "name" = '${task.name}', "repeat" = '${task.repeat}', "next_date" = '${task.next_date.toString()}', "complete" = '${task.complete}' WHERE "id" = ${task.id} AND "goal_id" = '${task.goal_id}';`)

        return await database.queryArray(`UPDATE "task" SET "name" = '${task.name}', "repeat" = '${task.repeat}', "next_date" = '${task.next_date}', "complete" = '${task.complete}' WHERE "id" = ${task.id} AND "goal_id" = '${task.goal_id}';`)
    }

    async delete(id: bigint, goal_id: string): Promise<any> {
        return await database.queryArray(`DELETE FROM "task" WHERE "id" = ${id} AND "goal_id" = '${goal_id}';`)
    }
}

export default new TaskRepository();