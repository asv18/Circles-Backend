import validate from "../../../validate.ts";
import friendshipService from "../service/friendship.service.ts";

class FriendshipController {
    async getFriendshipsOfUser(ctx: any): Promise<any> {
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
            data: await friendshipService.getFriendshipsOfUser(body["user_fkey"])
        }
    }
    async getFriendshipRequestsOfUser(ctx: any): Promise<any> {
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
            data: await friendshipService.getFriendshipRequestsOfUser(body["user_fkey"])
        }
    }

    async getFriendship(ctx: any): Promise<any> {
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
            data: await friendshipService.getFriendship(body["user_fkey_1"], body["user_fkey_2"])
        }
    }

    async createRequest(ctx: any): Promise<any> {
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

        await friendshipService.createRequest(ctx);

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }

    async updateFriendship(ctx: any): Promise<any> {
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

        await friendshipService.updateFriendship(ctx);

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
        
        await friendshipService.delete(body["id"]);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }
}

export default new FriendshipController()