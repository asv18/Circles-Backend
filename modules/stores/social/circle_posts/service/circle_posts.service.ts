import { Context } from "https://deno.land/x/oak/mod.ts";
import CirclePostConnection from "../dto/circle_post_connection.dto.ts";
import CirclePost from "../dto/circle_posts.dto.ts";
import circlePostsRepository from "../repository/circle_posts.repository.ts";

class CirclePostsService {
    async getCirclePosts(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await circlePostsRepository.getCirclePosts(body["circle_id"]);
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
            }

            circlePosts.push(postJson);
        });

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

        const circlePostID = ctx.params.circlepostID;

        const post: CirclePost = new CirclePost();

        post.id = circlePostID;

        // TODO: this

        /*
        "id": post.id.toString(),
        "circle_id": post.circle_id,
        "poster_fkey": post.poster_fkey,
        "title": post.title,
        "image": post.image,
        "description": post.description,
        "goal_id": post.goal_id,
        "task_id": (post.task_id != null) ? post.task_id.toString() : null,
        "likes": post.likes.toString(),
        */
    }

    async deleteCirclePost(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        return await circlePostsRepository.deleteCirclePost(ctx.params.circlepostID, body["circle_id"]);
    }
}

export default new CirclePostsService();