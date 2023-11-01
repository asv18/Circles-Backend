import userRepository from "../repository/user.repository.ts";
import User from "../dto/user.dto.ts";

class UserService {
    async getAll(query: string): Promise<any> {
        const data = await userRepository.getAll(query)

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

    async getAllNotInCircle(query: string, circle_id: string): Promise<any> {
        const data = await userRepository.getAllNotInCircle(query, circle_id);

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

    async getByFKey(user_fkey: string) {
        const data = await userRepository.getByFKey(user_fkey);
        let user: any = new User();

        data.rows.map((dataUser: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = dataUser[index]
            });
        });

        const userJSON: JSON = <JSON><any> {
            "name": user.name,
            "username": user.username,
            "email": user.email,
            "user_foreign_key": user.user_foreign_key,
            "photo_url": user.photo_url,
        }


        return userJSON;
    }

    async getFriendSkeletons(userKey: string): Promise<any> {
        const data = await userRepository.getFriendSkeletons(userKey)

        let users = new Array<JSON>();

        data.rows.map((a_user: []) => {
            const user: any = new User();

            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = a_user[index]
            });

            //"first_name", "last_name", "username", "email", "user_foreign_key", "photo_url"

            if (userKey !== user.user_foreign_key) {
                const userJson: JSON = <JSON><any> {
                    "name": user.name,
                    "username": user.username,
                    "photo_url": user.photo_url,
                    "email": user.email,
                    "user_foreign_key": user.user_foreign_key,
                }
    
                users.push(userJson);
            }
        });

        return users;
    }

    async getByAuth(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        const data = await userRepository.getByAuth(body["auth_id"]);
        let user: any = new User();

        data.rows.map((dataUser: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = dataUser[index]
            });
        });

        const userJSON: JSON = <JSON><any> {
            "id": user.id
        }


        return userJSON;
    }

    async getByID(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        const data = await userRepository.getByID(body["id"]);
        let user: any = new User();

        data.rows.map((dataUser: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = dataUser[index]
            });
        });

        const userJSON: JSON = <JSON><any> {
            "id": user.id,
            "name": user.name,
            "username": user.username,
            "email": user.email,
            "registeredAt": user.registeredAt,
            "authID": user.authID,
            "user_foreign_key": user.user_foreign_key,
            "photo_url": user.photo_url,
        }


        return userJSON;
    }

    async create(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let user: User = new User();

        user.name = body["name"];
        user.username = body["username"];
        user.email = body["email"];
        user.authID = body["authID"];
        user.photo_url = body["photo_url"];

        user.registeredAt = new Date().toISOString();

        return await userRepository.create(user);
    }

    async update(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;
        
        let user = new User();
        
        user.id = body["id"];
        user.name = body["name"];
        user.username = body["username"];
        user.password = body["password"];
        user.email = body["email"];
        user.photo_url = body["photo_url"];

        return await userRepository.update(user);
    }

    async delete(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        return await userRepository.delete(body["id"]);
    }

}
export default new UserService();
