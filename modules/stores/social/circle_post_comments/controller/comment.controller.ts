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
}

export default new CommentController();