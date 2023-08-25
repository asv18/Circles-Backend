import messageService from "../service/message.service.ts";

class MessageController {
    async getAll(ctx: any): Promise<any> {        
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