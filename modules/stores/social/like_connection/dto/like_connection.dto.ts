export default class LikeConnection {
    id?: bigint;
    user_fkey?: string;
    comment_id?: bigint | null;
    post_connection_id?: bigint;
    like_status?: string;
}