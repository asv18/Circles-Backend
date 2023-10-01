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

    async getChildComments(ctx: any): Promise<any> {
        const json = await ctx.request.body().value;

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await commentService.getChildren(json["post_connection_id"], json["comment_id"], json["user_fkey"], json["offset"])
        }
    }

    async createComment(ctx: any): Promise<any> {     
        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            },
            data: await commentService.createComment(ctx),
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

        let like = body;

        if (body["like_id"] == null || body["like_id"] == undefined) {
            like = await likeConnectionService.createLike(body["user_fkey"], body["comment_id"], undefined);
        }
        else {
            await likeConnectionService.updateLike(body["user_fkey"], body["like_id"], body["like_status"]);
        }

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Done",
            },
            data: like,
        }
    }
}

export default new CommentController();