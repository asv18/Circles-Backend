import friendshipService from "../service/friendship.service.ts";

class FriendshipController {
    async getFriendshipsOfUser(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await friendshipService.getFriendshipsOfUser(ctx.params.userKey)
        }
    }
    async getFriendshipRequestsOfUser(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await friendshipService.getFriendshipRequestsOfUser(ctx.params.userKey)
        }
    }

    async getFriendship(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await friendshipService.getFriendship(ctx.params.userKey1, ctx.params.userKey2)
        }
    }

    async createRequest(ctx: any): Promise<any> {
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
        await friendshipService.delete(ctx.params.id);

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