import User from "../../../user/dto/user.dto.ts";
import CircleConnection from "../dto/circle_connection.dto.ts";
import Circle from "../dto/circles.dto.ts";
import circlesRepository from "../repository/circles.repository.ts";

class CirclesService {
    async getCirclesOfUser(userKey: string): Promise<any> {
        const data = await circlesRepository.getCirclesOfUser(userKey);

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
            }

            circles.push(circleJSON);
        });
        
        for (let i = 0; i < circles.length; i++) {
            const users = await this.getUsersOfCircle(circles[i]["id" as keyof typeof circles[typeof i]].toString());

            const circle: JSON = <JSON><any> {
                "id": circles[i]["id" as keyof typeof circles[typeof i]],
                "created_at": circles[i]["created_at" as keyof typeof circles[typeof i]],
                "last_interacted_date": circles[i]["last_interacted_date" as keyof typeof circles[typeof i]],
                "circle_name": circles[i]["circle_name" as keyof typeof circles[typeof i]],
                "image": circles[i]["image" as keyof typeof circles[typeof i]],
                "created_by": circles[i]["created_by" as keyof typeof circles[typeof i]],
                "admin": circles[i]["admin" as keyof typeof circles[typeof i]],
                "users": users
            }

            circles[i] = circle;
        }

        return circles;
    }

    async getCircleById(circleID: string): Promise<any> {
        const data = await circlesRepository.getCircleById(circleID);

        const circle: any = new Circle();

        data.rows.map((a_circle: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                circle[item.name] = a_circle[index]
            });
        });

        const users = await this.getUsersOfCircle(circleID);

        const circleJSON: JSON = <JSON><any> {
            "id": circle.id,
            "created_at": circle.created_at,
            "last_interacted_date": circle.last_interacted_date,
            "circle_name": circle.circle_name,
            "image": circle.image,
            "created_by": circle.created_by,
            "admin": circle.admin,
            "users": users,
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
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
                "photo_url": user.photo_url,
                "user_foreign_key": user.user_foreign_key,
            }

            users.push(userJson);
        });

        return users;
    }

    async createCircleConnection(circle_id: string, user_fkey: string): Promise<any> {
        let circle_connection: CircleConnection = new CircleConnection();

        circle_connection.circle_id = circle_id;
        circle_connection.user_fkey = user_fkey;

        return await circlesRepository.createCircleConnection(circle_connection);
    }

    async createCircle(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const circle: Circle = new Circle();

        circle.circle_name = body["circle_name"];
        circle.image = body["image"];
        circle.created_by = body["user_creator"];
        circle.admin = body["user_creator"];

        return await circlesRepository.createCircle(circle);
    }

    async deleteCircle(id: string): Promise<any> {
        return await circlesRepository.deleteCircle(id);
    }
}

export default new CirclesService()