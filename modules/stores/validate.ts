import database from "../../database.ts";

class Validate {
    async validateUser(user_id: string) {
        let exists = false;

        try {
            const data = await database.queryArray(`
                SELECT EXISTS (SELECT 1 FROM "user" WHERE "id" = '${user_id}');
            `) as any;

            data.rows.map((exists_obj: []) => {
                data.rowDescription!.columns.map((item: any, index: number) => {
                    exists = exists_obj[index];
                });
            });

            return exists;
        } catch (e: any) {
            return exists;
        }
    }
}

export default new Validate();