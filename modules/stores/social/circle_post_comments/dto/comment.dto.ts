export default class Comment {
    id?: bigint;
    poster_fkey?: string;
    contents?: string;
    time_posted?: string;
    post_connection_id?: bigint;
    parent_id?: bigint;
    likes?: number;
}