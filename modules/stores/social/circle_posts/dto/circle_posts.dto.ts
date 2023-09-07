export default class CirclePost {
    id?: bigint;
    poster_fkey?: string;
    title?: string;
    image: string | null | undefined;
    description?: string;
    goal_id: string | null | undefined;
    task_id: bigint | null | undefined;
    likes?: number;
    posted_at?: string;
    connection_id?: bigint;
}