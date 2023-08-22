import circlesService from "../service/circles.service.ts";

class CirclesController {
    async getCirclesOfUser(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await circlesService.getCirclesOfUser(ctx.params.userKey)
        }
    }
    
    async getCircleById(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await circlesService.getCircleById(ctx.params.circleID)
        }
    }

    async getUsersOfCircle(ctx: any): Promise<any> {
        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            },
            data: await circlesService.getUsersOfCircle(ctx.params.circleID)
        }
    }

    async createCircleConnection(ctx: any): Promise<any> {
        await circlesService.createCircleConnection(ctx.params.circleID, ctx.params.userKey)

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }

    async createCircle(ctx: any): Promise<any> {
        await circlesService.createCircle(ctx)

        ctx.response.status = 201;
        ctx.response.body = {
            meta: {
                code: 201,
                status: "Created",
            }
        }
    }

    async deleteCircle(ctx: any): Promise<any> {
        await circlesService.deleteCircle(ctx.params.id);

        ctx.response.status = 200;
        ctx.response.body = {
            meta: {
                code: 200,
                status: "Ok",
            }
        }
    }
}

export default new CirclesController()