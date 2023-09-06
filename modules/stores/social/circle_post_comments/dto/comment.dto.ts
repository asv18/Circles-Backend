export default class Comment {
    id?: bigint;
    poster_fkey?: string;
    contents?: string;
    time_posted?: string;
    post_id?: bigint;
    parent_id?: bigint;
    likes?: number;
}