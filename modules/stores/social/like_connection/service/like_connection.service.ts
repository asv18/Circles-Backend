import LikeConnection from "../dto/like_connection.dto.ts";
import likeConnectionRepository from "../repository/like_connection.repository.ts";

class LikeConnectionService {
    async getLike(user_fkey: string, post_connection_id?: string, comment_id?: string): Promise<any> {
        const data = await likeConnectionRepository.getLike(user_fkey, post_connection_id, comment_id);

        let like: any = new LikeConnection();

        data.rows.map((a_like: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                like[item.name] = a_like[index]
            });
        });

        const likeJSON: JSON = <JSON><any> {
            "id": (like.id != null) ? like.id.toString() : null,
            "user_fkey": like.user_fkey,
            "comment_id": (like.comment_id != null) ? like.comment_id.toString() : null,
            "post_connection_id": (like.post_connection_id != null) ? like.post_connection_id.toString() : null,
            "like_status": like.like_status,
        }

        return likeJSON;
    }

    async checkLike(user_fkey: string, post_connection_id?: string, comment_id?: string): Promise<any> {
        const data = await likeConnectionRepository.checkLike(user_fkey, post_connection_id, comment_id);

        let exists = false;

        data.rows.map((exists_obj: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                exists = exists_obj[index];
            });
        });

        return exists;
    }

    async createLike(user_fkey: string, comment_id?: string, post_connection_id?: bigint): Promise<any> {
        const like = new LikeConnection();

        like.user_fkey = user_fkey;
        like.comment_id = comment_id == null || comment_id == undefined ? null : BigInt(comment_id!);
        like.post_connection_id = post_connection_id;
        
        return await likeConnectionRepository.createLike(like);
    }

    async updateLike(user_fkey: string, like_id: bigint, like_status: string): Promise<any> {
        const like = new LikeConnection();

        like.id = like_id;
        like.user_fkey = user_fkey;
        like.like_status = like_status;
        
        return await likeConnectionRepository.updateLike(like);
    }

    async deleteLike(like_id: string): Promise<any> {
        return await likeConnectionRepository.deleteLike(like_id);
    }
}

export default new LikeConnectionService();