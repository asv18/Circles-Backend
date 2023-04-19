export default class Task {
    id?: bigint;
    goal_id?: string;
    name?: string;
    start_date?: string;
    repeat?: string;
    current_complete?: boolean;
    next_date?: string;
}