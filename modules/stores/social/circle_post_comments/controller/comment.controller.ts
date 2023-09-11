import likeConnectionService from "../../like_connection/service/like_connection.service.ts";
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
    
    async updateLikeComment(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        if (body["like_id"] == null || body["like_id"] == undefined) {
            await likeConnectionService.createLike(body["user_fkey"], body["comment_id"], undefined);
            await commentService.likeComment(body["comment_id"]);
        }
        else {
            await likeConnectionService.updateLike(body["user_fkey"], body["like_id"], body["like_status"]);

            if (body["like_status"] == "unliked") {
                await commentService.unlikeComment(body["comment_id"]);
            }
            else {
                await commentService.likeComment(body["comment_id"]);
            }
        }

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Done",
            }
        }
    }
}

export default new CommentController();