export default class Comment {
    id?: string;
    poster_fkey?: string;
    contents?: string;
    time_posted?: string;
    post_connection_id?: string;
    parent_id?: string;
    likes?: number;
    overall_count?: number;
}