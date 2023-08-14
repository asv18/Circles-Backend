import Task from "../../task/dto/task.dto.ts";

//carries data between processes
export default class Goal {
    id?: string;
    owner?: string;
    name?: string;
    start_date?: string;
    finish_date?: string;
    progress?: number;
    description?: string;
    tasks?: Array<Task>;
}