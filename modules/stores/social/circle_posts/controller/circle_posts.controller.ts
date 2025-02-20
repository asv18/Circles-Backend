import validate from "../../../validate.ts";
import likeConnectionService from "../../like_connection/service/like_connection.service.ts";
import circlePostsService from "../service/circle_posts.service.ts";

class CirclePostsController {
    async getCirclePosts(ctx: any): Promise<any> {
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
            data: await circlePostsService.getCirclePosts(ctx)
        }
    }

    async createCirclePost(ctx: any): Promise<any> {
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

        await circlePostsService.createCirclePost(ctx)
        
        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            },
        }
    }

    async deleteCirclePost(ctx: any): Promise<any> {
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

        await circlePostsService.deleteCirclePost(ctx)

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }

    async getUserPosts(ctx: any): Promise<any> {
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
            data: await circlePostsService.getUserPosts(ctx)
        }
    }

    async updateCirclePost(ctx: any): Promise<any> {
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

        await circlePostsService.updateCirclePost(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Done",
            }
        }
    }

    async updateLikeCirclePost(ctx: any): Promise<any> {
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

        let like = "";
        
        if (body["like_id"] == null || body["like_id"] == undefined) {
            like = await likeConnectionService.createLike(body["user_fkey"], undefined, body["connection_id"]);
        }
        else if (body["like_id"] != null && body["like_id"] != undefined) {
            await likeConnectionService.updateLike(body["user_fkey"], body["like_id"], body["like_status"]);
        }
        else {
            throw Error();
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

export default new CirclePostsController();