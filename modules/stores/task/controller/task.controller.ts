import taskService from "../service/task.service.ts";

class TaskController {
    async getAll(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await taskService.getAll(ctx.params.goalID)
        }
    }

    async getByID(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await taskService.getByID(ctx.params.taskID, ctx.params.goalID)
        }
    }

    async create(ctx: any): Promise<any> {
        await taskService.create(ctx);

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }

    async updateMultiple(ctx: any): Promise<any> {
        await taskService.updateMultiple(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }

    async update(ctx: any): Promise<any> {
        await taskService.update(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }

    async delete(ctx: any): Promise<any> {
        await taskService.delete(ctx.params.taskID, ctx.params.goalID);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }
}

export default new TaskController()