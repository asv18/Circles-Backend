import taskRepository from "../repository/task.repository.ts";
import Task from "../dto/task.dto.ts";

class TaskService {

    async getAll(goal_id: string): Promise<any> {
        const data = await taskRepository.getAll(goal_id)
        const tasks = new Array<JSON>();

        data.rows.map((a_task: []) => {
            const task: any = new Task();

            data.rowDescription.columns.map((item: any, index: number) => {
                task[item.name] = a_task[index]
            });

            let next_date = new Date()

            //console.log((new Date()).getTime() >= task.next_date.getTime() && task.complete && task.repeat !== 'Never')

            if (next_date.getTime() >= task.next_date.getTime() && task.complete && task.repeat !== 'Never')
            {
                switch (task.repeat) {
                    case "Daily": {
                        next_date = new Date(next_date.getFullYear(), next_date.getMonth(), next_date.getDay() + 1)
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

                task.next_date = next_date.toISOString();
                task.complete = false;
                taskRepository.update(task);
            }

            const taskJSON: JSON = <JSON><any> {
                "id": task.id.toString(),
                "goal_id": task.goal_id,
                "name": task.name,
                "start_date": task.start_date,
                "next_date": task.next_date,
                "repeat": task.repeat,
                "complete": task.complete.toString()
            }

            tasks.push(taskJSON);
        });
        
        return tasks;
    }

    async getByID(id: bigint, goal_id: string): Promise<any> {
        const data = await taskRepository.getByID(id, goal_id)
        const task: any = new Task();

        data.rows.map((a_task: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                task[item.name] = a_task[index]
            });
        });

        const taskJSON: JSON = <JSON><any> {
            "id": task.id.toString(),
            "goal_id": task.goal_id.toString(),
            "name": task.name,
            "start_date": task.start_date,
            "next_date": task.next_date,
            "repeat": task.repeat,
            "complete": task.complete
        }
        
        return taskJSON;
    }


    async create(ctx: any) {
        const body = await ctx.request.body().value;

        let task: Task = new Task();

        task.name = body["name"];
        task.repeat = body["repeat"];
        task.goal_id = ctx.params.goalID;

        let next_date: Date = new Date()

        switch (task.repeat) {
            case "Daily": {
                next_date = new Date(next_date.getFullYear(), next_date.getMonth(), next_date.getDay() + 1)
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

        return await taskRepository.create(task);
    }

    async updateMultiple(ctx: any): Promise<any> {
        const data = await ctx.request.body().value;

        const body = data["tasks"];

        let response;
        
        for (let i = 0; i < body.length; i++) {
            let task = new Task();
        
            task.id = BigInt(body[i]["id"])
            task.goal_id = ctx.params.goalID
            task.name = body[i]["name"];
            task.repeat = body[i]["repeat"];
    
            task.next_date = body[i]["next_date"];
            task.complete = body[i]["complete"];

            response = await taskRepository.update(task);
        }

        return response;
    }

    async update(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        
        let task = new Task();
        
        task.id = ctx.params.taskID
        task.goal_id = ctx.params.goalID
        task.name = body["name"];
        task.repeat = body["repeat"];

        task.next_date = body["next_date"];
        task.complete = body["complete"];

        return await taskRepository.update(task);
    }

    async delete(id: bigint, goal_id: string): Promise<any> {
        return await taskRepository.delete(id, goal_id);
    }
}

export default new TaskService();