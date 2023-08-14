export default class Message {
    id?: bigint;
    contents?: string;
    friendship_id?: bigint;
    time_sent?: string;
    reply_id?: bigint;
    user_fkey?: string;
}