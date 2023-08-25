import Friendship from "../dto/friendship.dto.ts";
import friendshipRepository from "../repository/friendship.repository.ts";

class FriendShipService {
    async getFriendshipsOfUser(userKey: string): Promise<any> {
        const data = await friendshipRepository.getFriendshipsOfUser(userKey);

        let friendships = new Array<JSON>();

        data.rows.map((a_friendship: []) => {
            const friendship: any = new Friendship();

            data.rowDescription.columns.map((item: any, index: number) => {
                friendship[item.name] = a_friendship[index]
            });

            const friendshipJSON: JSON = <JSON><any> {
                "id": friendship.id.toString(),
                "user1": friendship.user1,
                "user2": friendship.user2,
                "relationship": friendship.relationship,
                "date_created": friendship.date_created,
                "last_interacted_date": friendship.last_interacted_date,
            }

            friendships.push(friendshipJSON);
        });

        return friendships;
    }

    async getFriendshipRequestsOfUser(userKey: string): Promise<any> {
        const data = await friendshipRepository.getFriendshipRequestsOfUser(userKey);

        let requests = new Array<JSON>();

        data.rows.map((a_friendship: []) => {
            const friendship: any = new Friendship();

            data.rowDescription.columns.map((item: any, index: number) => {
                friendship[item.name] = a_friendship[index]
            });

            const friendshipJSON: JSON = <JSON><any> {
                "id": friendship.id.toString(),
                "user1": friendship.user1,
                "user2": friendship.user2,
                "relationship": friendship.relationship,
                "date_created": friendship.date_created,
                "last_interacted_date": friendship.last_interacted_date,
            }

            requests.push(friendshipJSON);
        });

        return requests;
    }

    async getFriendship(foreignKey1: string, foreignKey2: string): Promise<any> {
        const data = await friendshipRepository.getFriendship(foreignKey1, foreignKey2);

        const friendship: any = new Friendship();

        data.rows.map((a_friendship: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                friendship[item.name] = a_friendship[index]
            });
        });

        const friendshipJSON: JSON = <JSON><any> {
            "id": friendship.id.toString(),
            "user1": friendship.user1,
            "user2": friendship.user2,
            "relationship": friendship.relationship,
            "date_created": friendship.date_created,
            "last_interacted_date": friendship.last_interacted_date,
        }

        return friendshipJSON;
    }

    async createRequest(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let friendship: Friendship = new Friendship();

        friendship.user1 = body["user_fkey_1"];
        friendship.user2 = body["user_fkey_2"];

        return await friendshipRepository.createRequest(friendship);
    }

    async updateFriendship(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let friendship: Friendship = new Friendship();

        friendship.id = body["id"];
        friendship.user1 = body["user_fkey_1"];
        friendship.user2 = body["user_fkey_1"];
        friendship.relationship = body["relationship"];
        friendship.last_interacted_date = (new Date()).toISOString();

        return await friendshipRepository.updateFriendship(friendship);
    }

    async delete(id: string): Promise<any> {
        return await friendshipRepository.delete(id);
    }
}

export default new FriendShipService();