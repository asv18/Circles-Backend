import userRepository from "../repository/user.repository.ts";
import User from "../dto/user.dto.ts";

class UserService {
    async getAll(): Promise<any> {
        const data = await userRepository.getAll()

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
                "email": user.email,
                "user_foreign_key": user.user_foreign_key,
                "id": user.id,
            }

            users.push(userJson);
        });

        return users;
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
                    "first_name": user.first_name,
                    "last_name": user.last_name,
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

    async getByAuth(password: string): Promise<any> {
        const data = await userRepository.getByAuth(password);
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

    async getByID(id: string): Promise<any> {
        const data = await userRepository.getByID(id);
        let user: any = new User();

        data.rows.map((dataUser: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                user[item.name] = dataUser[index]
            });
        });

        const userJSON: JSON = <JSON><any> {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
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

        user.first_name = body["first_name"];
        user.last_name = body["last_name"];
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
        
        user.id = ctx.params.id
        user.first_name = body["first_name"];
        user.last_name = body["last_name"];
        user.username = body["username"];
        user.password = body["password"];
        user.email = body["email"];
        user.photo_url = body["photo_url"];

        return await userRepository.update(user);
    }

    async delete(id: string): Promise<any> {
        return await userRepository.delete(id);
    }

}
export default new UserService();
