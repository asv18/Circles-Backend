import CirclePostConnection from "../dto/circle_post_connection.dto.ts";
import CirclePost from "../dto/circle_posts.dto.ts";
import circlePostsRepository from "../repository/circle_posts.repository.ts";
import userService from "../../../user/service/user.service.ts";
import likeConnectionService from "../../like_connection/service/like_connection.service.ts";

class CirclePostsService {
    async getCirclePosts(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlePostsRepository.getCirclePosts(body["circle_id"]);
        const user_fkey = body["user_fkey"];

        let circlePosts = new Array<JSON>();

        data.rows.map((a_post: []) => {
            const post: any = new CirclePost();

            data.rowDescription.columns.map((item: any, index: number) => {
                post[item.name] = a_post[index]
            });

            const postJson: JSON = <JSON><any> {
                "id": post.id.toString(),
                "poster_fkey": post.poster_fkey,
                "title": post.title,
                "image": post.image,
                "description": post.description,
                "goal_id": post.goal_id,
                "task_id": (post.task_id != null) ? post.task_id.toString() : null,
                "likes": post.likes.toString(),
                "posted_at": post.posted_at,
                "connection_id": post.connection_id.toString(),
            }

            circlePosts.push(postJson);
        });

        for (let i = 0; i < circlePosts.length; i++) {
            const poster_fkey = circlePosts[i]["poster_fkey" as keyof typeof circlePosts[typeof i]] as string;

            let poster = await userService.getByFKey(poster_fkey);

            let liked = await likeConnectionService.getLike(user_fkey, circlePosts[i]["connection_id" as keyof typeof circlePosts[typeof i]] as string, undefined);

            const circlePost: JSON = <JSON><any> {
                "id": circlePosts[i]["id" as keyof typeof circlePosts[typeof i]],
                "poster": poster,
                "title": circlePosts[i]["title" as keyof typeof circlePosts[typeof i]],
                "image": circlePosts[i]["image" as keyof typeof circlePosts[typeof i]],
                "description": circlePosts[i]["description" as keyof typeof circlePosts[typeof i]],
                "goal_id": circlePosts[i]["goal_id" as keyof typeof circlePosts[typeof i]],
                "task_id": circlePosts[i]["task_id" as keyof typeof circlePosts[typeof i]],
                "likes": circlePosts[i]["likes" as keyof typeof circlePosts[typeof i]],
                "posted_at": circlePosts[i]["posted_at" as keyof typeof circlePosts[typeof i]],
                "connection_id": circlePosts[i]["connection_id" as keyof typeof circlePosts[typeof i]],
                "liked": liked,
            }

            circlePosts[i] = circlePost;
        }

        return circlePosts;
    }

    async createCirclePost(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let post = new CirclePost();

        post.title = body["title"];
        post.description = body["description"];
        post.image = body["image"];
        post.poster_fkey = body["user_fkey"];
        post.goal_id = body["goal_id"];
        post.task_id = body["task_id"];

        let circles: Array<any> = body["circle_ids"];

        const data = await circlePostsRepository.createCirclePost(post);

        const newPost: any = new CirclePost();
        data.rows.map((a_post: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                newPost[item.name] = a_post[index]
            });
        });

        const circlePostConnection = new CirclePostConnection();
        circlePostConnection.post_id = newPost.id;

        circles.forEach(async circleID => {
            circlePostConnection.circle_id = circleID;
            await circlePostsRepository.createCirclePostConnection(circlePostConnection);
        });

        return data;
    }

    async getUserPosts(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlePostsRepository.getUserPosts(body["user_fkey"]);
        let userPosts = new Array<JSON>();

        data.rows.map((a_post: []) => {
            const post: any = new CirclePost();

            data.rowDescription.columns.map((item: any, index: number) => {
                post[item.name] = a_post[index]
            });

            const postJson: JSON = <JSON><any> {
                "id": post.id.toString(),
                "poster_fkey": post.poster_fkey,
                "title": post.title,
                "image": post.image,
                "description": post.description,
                "goal_id": post.goal_id,
                "task_id": (post.task_id != null) ? post.task_id.toString() : null,
            }

            userPosts.push(postJson);
        });

        return userPosts;
    }

    async updateCirclePost(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const circlePostID = body["circle_post_id"];

        const post: CirclePost = new CirclePost();

        post.id = circlePostID;
        post.title = body["title"];
        post.description = body["description"];
        post.image = body["image"];

        return await circlePostsRepository.updatePost(post);
    }
    
    async likePost(connection_id: string): Promise<any> {
        return await circlePostsRepository.likePost(connection_id);
    }

    async unlikePost(connection_id: string): Promise<any> {
        return await circlePostsRepository.unlikePost(connection_id);
    }

    async deleteCirclePost(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        return await circlePostsRepository.deleteCirclePost(body["circle_post_id"], body["circle_id"]);
    }
}

export default new CirclePostsService();