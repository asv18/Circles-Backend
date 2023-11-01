
import userService from "../service/user.service.ts"

class UserController {
    async getAll(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await userService.getAll(ctx.request.url.searchParams.get('query').toString())
        }
    }

    async getAllNotInCircle(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await userService.getAllNotInCircle(ctx.request.url.searchParams.get('query').toString(), body["circle_id"])
        }
    }

    async getFriendSkeletons(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await userService.getFriendSkeletons(body["user_fkey"])
        }
    }

    async getByAuth(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await userService.getByAuth(ctx)
        }
    }

    async getByID(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await userService.getByID(ctx)
        }
    }

    async create(ctx: any): Promise<any> {
        await userService.create(ctx);

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }

    async update(ctx: any): Promise<any> {
        await userService.update(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }

    async delete(ctx: any): Promise<any> {
        await userService.delete(ctx);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }
}

export default new UserController();