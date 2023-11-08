import goalRepository from "../repository/goal.repository.ts";
import Goal from "../dto/goal.dto.ts";
import Task from "../../task/dto/task.dto.ts";
import taskService from "../../task/service/task.service.ts";

class GoalService {
    async getAll(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        const data = await goalRepository.getAll(body["id"])

        let goals = new Array<JSON>();

        data.rows.map((a_goal: []) => {
            const goal: any = new Goal();

            data.rowDescription.columns.map((item: any, index: number) => {
                goal[item.name] = a_goal[index]
            });

            const goalJSON: JSON = <JSON><any> {
                "id": goal.id,
                "name": goal.name,
                "start_date": goal.start_date,
                "finish_date": goal.finish_date,
                "progress": goal.progress.toString(),
                "description": goal.description,
            }

            goals.push(goalJSON);
        });

        for (let i = 0; i < goals.length; i++) {
            const tasks = await taskService.getAll(goals[i]["id" as keyof typeof goals[typeof i]].toString(), body["id"]);

            const goal: JSON = <JSON><any> {
                "id": goals[i]["id" as keyof typeof goals[typeof i]],
                "name": goals[i]["name" as keyof typeof goals[typeof i]],
                "start_date": goals[i]["start_date" as keyof typeof goals[typeof i]],
                "finish_date": goals[i]["finish_date" as keyof typeof goals[typeof i]],
                "progress": goals[i]["progress" as keyof typeof goals[typeof i]].toString(),
                "description": goals[i]["description" as keyof typeof goals[typeof i]],
                "tasks": tasks
            }

            goals[i] = goal;
        }
        
        return goals;
    }

    async getByID(ctx: any): Promise<any> {
        const body = ctx.request.body().value;
        const data = await goalRepository.getByID(ctx.params.id, body["id"])
        const goal: any = new Goal();

        data.rows.map((a_goal: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                goal[item.name] = a_goal[index]
            });
        });

        const tasks = await taskService.getAll(goal.id, goal.owner);

        const goalJSON: JSON = <JSON><any> {
            "id": goal.id,
            "name": goal.name,
            "start_date": goal.start_date,
            "finish_date": goal.finish_date,
            "progress": goal.progress.toString(),
            "description": goal.description,
            "tasks": tasks
        }
        
        return goalJSON;
    }


    async create(ctx: any) {
        const body = await ctx.request.body().value;

        let goal: Goal = new Goal();

        goal.name = body["name"];
        goal.finish_date = body["finish_date"];
        goal.description = body["description"];
        goal.owner = body["user_id"];

        const tasks: Array<any> = JSON.parse(body["tasks"]);

        const data = await goalRepository.create(goal);

        let id: any = "";

        data.rows.map((a_goal: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                id = a_goal[index]
            });
        });

        let insertString = "";

        if (tasks.length > 0) {
            insertString = "INSERT INTO \"task\" (\"name\", \"goal_id\", \"repeat\", \"next_date\") VALUES ";

            tasks.forEach((element) => {
                const task: Task = new Task()

                task.name = element["name"];
                task.repeat = element["repeat"];

                let next_date: Date = new Date()

                switch (task.repeat) {
                    case "Daily": {
                        next_date = new Date(next_date.getFullYear(), next_date.getMonth(), next_date.getDate() + 2)
                        break;
                    }
                    case "Weekly": {
                        next_date = new Date(next_date.setDate(next_date.getDate() - next_date.getDay() + 6));
                        break;
                    }
                    case "Monthly": {
                        next_date = new Date(next_date.getFullYear(), next_date.getMonth() + 1, 0)
                        break;
                    }
                }

                task.next_date = next_date.toISOString()
                
                insertString += `('${task.name}', '${id}', '${task.repeat}','${task.next_date}')`

                if (tasks.indexOf(element) != tasks.length-1) {
                    insertString += ", "
                }
            });
        }


        return await goalRepository.createTasks(insertString);
    }

    async update(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        
        let goal = new Goal();
        
        goal.id = ctx.params.id;
        goal.owner = body["user_id"];
        goal.name = body["name"];
        goal.finish_date = body["end_date"];
        goal.progress = body["progress"];
        goal.description = body["description"];

        return await goalRepository.update(goal);
    }

    async delete(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        
        return await goalRepository.delete(ctx.params.id, body["user_id"]);
    }
}

export default new GoalService();