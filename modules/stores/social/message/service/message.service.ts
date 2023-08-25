import Message from "../dto/message.dto.ts";
import messageRepository from "../repository/message.repository.ts";

class MessageService {
    async getChunk(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        const data = await messageRepository.getChunk(body["friendship_id"], ctx.params.offset)

        let messages = new Array<JSON>();

        data.rows.map((a_message: []) => {
            const message: any = new Message();

            data.rowDescription.columns.map((item: any, index: number) => {
                message[item.name] = a_message[index]
            });

            const messageJson: JSON = <JSON><any> {
                "id": message.id.toString(),
                "contents": message.contents,
                "friendship_id": message.friendship_id.toString(),
                "date_sent": message.time_sent,
                "reply_id": message.reply_id == null ? null : message.reply_id.toString(),
                "user_fkey": message.user_fkey,
            }

            messages.push(messageJson);
        });

        return messages.reverse();
    }

    async createFromSocket(json: any): Promise<any> {
        const body = json;

        let message: Message = new Message();

        message.contents = body["contents"];
        message.friendship_id = body["friendship_id"];
        message.reply_id = (body["reply_id"] == "null" || body["reply_id"] == null) ? null : body["reply_id"];
        message.user_fkey = body["user_fkey"];

        const data = await messageRepository.create(message);

        let created_message: any = new Message();

        data.rows.map((a_message: []) => {
            data.rowDescription.columns.map((item: any, index: number) => {
                created_message[item.name] = a_message[index]
            });
        });

        const messageJson: JSON = <JSON><any> {
            "id": created_message.id.toString(),
            "contents": created_message.contents,
            "friendship_id": created_message.friendship_id.toString(),
            "date_sent": created_message.time_sent,
            "reply_id": message.reply_id == null ? null : message.reply_id.toString(),
            "user_fkey": created_message.user_fkey,
        }

        return JSON.stringify(messageJson);
    }

    async create(ctx: any): Promise<any> {
        const body = await ctx.request.body().value;

        let message: Message = new Message();

        message.contents = body["contents"];
        message.friendship_id = body["friendship_id"];
        message.reply_id = (body["reply_id"] == "null") ? null : body["reply_id"];
        message.user_fkey = body["user_fkey"];

        return await messageRepository.create(message);
    }
}

export default new MessageService()