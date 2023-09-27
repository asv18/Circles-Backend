import userService from "../../../user/service/user.service.ts";
import likeConnectionService from "../../like_connection/service/like_connection.service.ts";
import Comment from "../dto/comment.dto.ts";
import commentRepository from "../repository/comment.repository.ts";

class CommentService {
    async getComments(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await commentRepository.getComments(body["post_connection_id"]);
        const user_fkey = body["user_fkey"];

        const comments = new Array<JSON>();

        data.rows.map((a_comment: []) => {
            const comment: any = new Comment();

            data.rowDescription.columns.map((item: any, index: number) => {
                comment[item.name] = a_comment[index]
            });

            const commentJson: JSON = <JSON><any> {
                "id": comment.id.toString(),
                "poster_fkey": comment.poster_fkey,
                "contents": comment.contents,
                "time_posted": comment.time_posted,
                "post_id": comment.post_connection_id.toString(),
                "parent_id": comment.parent_id != null ? comment.parent_id.toString() : null,
                "likes": comment.likes.toString(),
            }

            comments.push(commentJson);
        });

        for (let i = 0; i < comments.length; i++) {
            const poster_fkey = comments[i]["poster_fkey" as keyof typeof comments[typeof i]] as string;

            const poster = await userService.getByFKey(poster_fkey);

            const liked = await likeConnectionService.getLike(user_fkey, undefined, comments[i]["id" as keyof typeof comments[typeof i]] as string);

            const children = await this.getChildren(body["post_connection_id"], comments[i]["id" as keyof typeof comments[typeof i]] as string, user_fkey);

            const commentJSON: JSON = <JSON><any> {
                "id": comments[i]["id" as keyof typeof comments[typeof i]],
                "poster": poster,
                "contents": comments[i]["contents" as keyof typeof comments[typeof i]],
                "time_posted": comments[i]["time_posted" as keyof typeof comments[typeof i]],
                "description": comments[i]["description" as keyof typeof comments[typeof i]],
                "post_id": comments[i]["post_id" as keyof typeof comments[typeof i]],
                "parent_id": comments[i]["parent_id" as keyof typeof comments[typeof i]],
                "likes": comments[i]["likes" as keyof typeof comments[typeof i]],
                "liked": liked,
                "children": children,
            }

            comments[i] = commentJSON;
        }

        return comments;
    }

    async getChildren(post_connection_id: string, comment_id: string, user_fkey: string): Promise<any> {
        const data = await commentRepository.getChildren(post_connection_id, comment_id);

        const comments = new Array<JSON>();

        data.rows.map((a_comment: []) => {
            const comment: any = new Comment();

            data.rowDescription.columns.map((item: any, index: number) => {
                comment[item.name] = a_comment[index]
            });

            const commentJson: JSON = <JSON><any> {
                "id": comment.id.toString(),
                "poster_fkey": comment.poster_fkey,
                "contents": comment.contents,
                "time_posted": comment.time_posted,
                "post_id": comment.post_connection_id.toString(),
                "parent_id": comment.parent_id != null ? comment.parent_id.toString() : null,
                "likes": comment.likes.toString(),
            }

            comments.push(commentJson);
        });

        for (let i = 0; i < comments.length; i++) {
            const poster_fkey = comments[i]["poster_fkey" as keyof typeof comments[typeof i]] as string;

            let poster = await userService.getByFKey(poster_fkey);

            let liked = await likeConnectionService.getLike(user_fkey, undefined, comments[i]["id" as keyof typeof comments[typeof i]] as string);

            const commentJSON: JSON = <JSON><any> {
                "id": comments[i]["id" as keyof typeof comments[typeof i]],
                "poster": poster,
                "contents": comments[i]["contents" as keyof typeof comments[typeof i]],
                "time_posted": comments[i]["time_posted" as keyof typeof comments[typeof i]],
                "description": comments[i]["description" as keyof typeof comments[typeof i]],
                "post_id": comments[i]["post_id" as keyof typeof comments[typeof i]],
                "parent_id": comments[i]["parent_id" as keyof typeof comments[typeof i]],
                "likes": comments[i]["likes" as keyof typeof comments[typeof i]],
                "liked": liked,
            }

            comments[i] = commentJSON;
        }

        return comments;
    }

    async createComment(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const newComment = new Comment();

        newComment.poster_fkey = body["poster_fkey"];
        newComment.contents = body["contents"];
        newComment.post_connection_id = body["post_id"];
        newComment.parent_id = body["parent_id"];

        const comment: any = new Comment();

        const data = await commentRepository.createComment(comment); 

        data.rows.map((a_comment: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                comment[item.name] = a_comment[index]
            });
        });

        const poster_fkey = comment.poster_fkey;

        let poster = await userService.getByFKey(poster_fkey);

        let liked = await likeConnectionService.getLike(body["poster_fkey"], undefined, comment.id);

        const commentJson: JSON = <JSON><any> {
            "id": comment.id.toString(),
            "poster": poster,
            "contents": comment.contents,
            "time_posted": comment.time_posted,
            "post_id": comment.post_connection_id.toString(),
            "parent_id": comment.parent_id != null ? comment.parent_id.toString() : null,
            "likes": comment.likes.toString(),
            "liked": liked,
        }

        return commentJson;
    }

    async updateComment(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const comment = new Comment();

        comment.id = body["id"];
        comment.contents = body["contents"];
        comment.poster_fkey = body["poster_fkey"];

        return await commentRepository.updateComment(comment); 
    }

    async deleteComment(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        return await commentRepository.deleteComment(body["id"]);
    }
}

export default new CommentService();