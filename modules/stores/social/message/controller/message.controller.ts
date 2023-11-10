import validate from "../../../validate.ts";
import messageService from "../service/message.service.ts";

class MessageController {
    async getAll(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const result = await validate.validateUser(body["user_id"])

        if (!result) {
            ctx.response.status = 401;
            ctx.response.body = {
                meta: {
                    code: 401,
                    status: "Not Authorized",
                }
            }

            return;
        }
        
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await messageService.getChunk(ctx)
        }
    }

    async create(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const result = await validate.validateUser(body["user_id"])

        if (!result) {
            ctx.response.status = 401;
            ctx.response.body = {
                meta: {
                    code: 401,
                    status: "Not Authorized",
                }
            }

            return;
        }
        
        await messageService.create(ctx)

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }
}

export default new MessageController();