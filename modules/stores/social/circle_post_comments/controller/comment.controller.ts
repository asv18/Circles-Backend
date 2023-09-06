import commentService from "../service/comment.service.ts";

class CommentController {
    async getComments(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await commentService.getComments(ctx)
        }
    }

    async createComment(ctx: any): Promise<any> {
        await commentService.createComment(ctx)
        
        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            },
        }
    }

    async updateComment(ctx: any): Promise<any> {
        await commentService.updateComment(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Done",
            }
        }
    }

    async deleteComment(ctx: any): Promise<any> {
        await commentService.deleteComment(ctx)

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }
}

export default new CommentController();