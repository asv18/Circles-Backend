import userRepository from "../repository/user.repository.ts";
import User from "../dto/user.dto.ts";

class UserService {

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
            "password": user.password,
            "authID": user.authID
        }

        return userJSON;
    }

    async create(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let user: User = new User();

        user.first_name = body["first_name"];
        user.last_name = body["last_name"];
        user.username = body["username"];
        user.password = body["password"];
        user.email = body["email"];
        user.authID = body["authID"];

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
        

        return await userRepository.update(user);
    }

    async delete(id: string): Promise<any> {
        return await userRepository.delete(id);
    }

}
export default new UserService();
