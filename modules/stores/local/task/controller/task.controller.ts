import { CHAR_DOT } from "https://deno.land/std@0.160.0/path/_constants.ts";
import taskService from "../service/task.service.ts";

class TaskController {
    async getAll(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await taskService.getAll(ctx.params.goalID, body["user_id"])
        }
    }

    async getByID(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await taskService.getByID(ctx.params.taskID, ctx.params.goalID, body["user_id"])
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
        const body = await ctx.request.body().value;
        await taskService.delete(ctx.params.taskID, ctx.params.goalID, body["user_id"]);

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