import circlePostsService from "../service/circle_posts.service.ts";

class CirclePostsController {
    async getCirclePosts(ctx: any): Promise<any> {
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
        await circlePostsService.updateCirclePost(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Done",
            }
        }
    }
}

export default new CirclePostsController();