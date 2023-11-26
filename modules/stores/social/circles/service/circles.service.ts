import User from "../../../user/dto/user.dto.ts";
import userService from "../../../user/service/user.service.ts";
import CircleConnection from "../dto/circle_connection.dto.ts";
import Circle from "../dto/circles.dto.ts";
import circlesRepository from "../repository/circles.repository.ts";

class CirclesService {
    async queryCircles(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlesRepository.getAvailableCircles(body["offset"], body["query"], body["user_fkey"]);

        let circles = new Array<JSON>();

        data.rows.map((a_circle: []) => {
            const circle: any = new Circle();

            data.rowDescription.columns.map((item: any, index: number) => {
                circle[item.name] = a_circle[index]
            });
            

            const circleJSON: JSON = <JSON><any> {
                "id": circle.id,
                "created_at": circle.created_at,
                "last_interacted_date": circle.last_interacted_date,
                "circle_name": circle.circle_name,
                "image": circle.image,
                "created_by": circle.created_by,
                "admin": circle.admin,
                "publicity": circle.publicity
            }

            circles.push(circleJSON);
        });
        
        for (let i = 0; i < circles.length; i++) {
            const users = await this.getUsersOfCircle(circles[i]["id" as keyof typeof circles[typeof i]].toString());

            const admin = circles[i]["admin" as keyof typeof circles[typeof i]] as string;

            let adminJSON = await userService.getByFKey(admin);

            const circle: JSON = <JSON><any> {
                "id": circles[i]["id" as keyof typeof circles[typeof i]],
                "created_at": circles[i]["created_at" as keyof typeof circles[typeof i]],
                "last_interacted_date": circles[i]["last_interacted_date" as keyof typeof circles[typeof i]],
                "circle_name": circles[i]["circle_name" as keyof typeof circles[typeof i]],
                "image": circles[i]["image" as keyof typeof circles[typeof i]],
                "created_by": circles[i]["created_by" as keyof typeof circles[typeof i]],
                "admin": adminJSON,
                "users": users,
                "publicity": circles[i]["publicity" as keyof typeof circles[typeof i]]
            }

            circles[i] = circle;
        }

        return circles;
    }

    async getCirclesOfUser(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlesRepository.getCirclesOfUser(body["user_fkey"]);

        let circles = new Array<JSON>();

        data.rows.map((a_circle: []) => {
            const circle: any = new Circle();

            data.rowDescription.columns.map((item: any, index: number) => {
                circle[item.name] = a_circle[index]
            });
            

            const circleJSON: JSON = <JSON><any> {
                "id": circle.id,
                "created_at": circle.created_at,
                "last_interacted_date": circle.last_interacted_date,
                "circle_name": circle.circle_name,
                "image": circle.image,
                "created_by": circle.created_by,
                "admin": circle.admin,
                "post_count": circle.post_count.toString(),
                "publicity": circle.publicity
            }

            circles.push(circleJSON);
        });
        
        for (let i = 0; i < circles.length; i++) {
            const users = await this.getUsersOfCircle(circles[i]["id" as keyof typeof circles[typeof i]].toString());

            const admin = circles[i]["admin" as keyof typeof circles[typeof i]] as string;

            let adminJSON = await userService.getByFKey(admin);

            const circle: JSON = <JSON><any> {
                "id": circles[i]["id" as keyof typeof circles[typeof i]],
                "created_at": circles[i]["created_at" as keyof typeof circles[typeof i]],
                "last_interacted_date": circles[i]["last_interacted_date" as keyof typeof circles[typeof i]],
                "circle_name": circles[i]["circle_name" as keyof typeof circles[typeof i]],
                "image": circles[i]["image" as keyof typeof circles[typeof i]],
                "created_by": circles[i]["created_by" as keyof typeof circles[typeof i]],
                "admin": adminJSON,
                "post_count": circles[i]["post_count" as keyof typeof circles[typeof i]],
                "users": users,
                "publicity": circles[i]["publicity" as keyof typeof circles[typeof i]]
            }

            circles[i] = circle;
        }

        return circles;
    }

    async getCircleById(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlesRepository.getCircleById(body["circle_id"]);

        const circle: any = new Circle();

        data.rows.map((a_circle: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                circle[item.name] = a_circle[index]
            });
        });

        const users = await this.getUsersOfCircle(body["circle_id"]);

        const admin = circle["admin"] as string;

        let adminJSON = await userService.getByFKey(admin);

        const circleJSON: JSON = <JSON><any> {
            "id": circle.id,
            "created_at": circle.created_at,
            "last_interacted_date": circle.last_interacted_date,
            "circle_name": circle.circle_name,
            "image": circle.image,
            "created_by": circle.created_by,
            "admin": adminJSON,
            "users": users,
            "publicity": circle.publicity
        }
        

        return circleJSON;
    }

    async getUsersOfCircle(circle_id: string): Promise<any> {
        const data = await circlesRepository.getUsersOfCircle(circle_id);

        let users = new Array<JSON>();

        data.rows.map((a_user: []) => {
            const user: any = new User();

            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = a_user[index]
            });

            const userJson: JSON = <JSON><any> {
                "name": user.name,
                "username": user.username,
                "photo_url": user.photo_url,
                "user_foreign_key": user.user_foreign_key,
            }

            users.push(userJson);
        });

        return users;
    }

    async createCircleConnection(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let circle_connection: CircleConnection = new CircleConnection();

        circle_connection.circle_id = body["circle_id"];
        circle_connection.user_fkey = body["user_fkey"];

        return await circlesRepository.createCircleConnection(circle_connection);
    }

    async createCircle(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const circle: Circle = new Circle();

        circle.circle_name = body["circle_name"];
        circle.image = body["image"];
        circle.created_by = body["user_creator"];
        circle.admin = body["user_creator"];
        circle.publicity = body["publicity"];

        return await circlesRepository.createCircle(circle);
    }

    async deleteCircle(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        return await circlesRepository.deleteCircle(body["circle_id"], body["user_fkey"], body["user_id"]);
    }

    async deleteCircleConnection(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const response = await circlesRepository.deleteCircleConnection(body["circle_id"], body["user_fkey"]);

        let isAdmin = false;
        const adminCheck = await circlesRepository.checkAdmin(body["circle_id"], body["user_fkey"]);

        adminCheck.rows.map((exists_obj: []) => {
            adminCheck.rowDescription!.columns.map((item: any, index: number) => {
                isAdmin = exists_obj[index];
            });
        });

        if (isAdmin) {
            const user: any = new User();

            let userGet = await circlesRepository.userGetFirst(body["circle_id"]);

            userGet.rows.map((user_obj: []) => {
                userGet.rowDescription!.columns.map((item: any, index: number) => {
                    user[item.name] = user_obj[index];
                });
            });

            await circlesRepository.updateCircleAdmin(body["circle_id"], user.user_foreign_key);
        }

        return response;
    }
}

export default new CirclesService()