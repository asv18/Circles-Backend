import UserController from "../stores/user/controller/user.controller.ts";
import GoalController from "../stores/goal/controller/goal.controller.ts";
import TaskController from "../stores/task/controller/task.controller.ts";


export const api = (router: any) => {
    router
        .get("/api/v1/user/authenticate/:authID", UserController.getByAuth)
        .get("/api/v1/user/:id", UserController.getByID)
        .post("/api/v1/user", UserController.create)
        .patch("/api/v1/user/:id", UserController.update)
        .delete("/api/v1/user/:id", UserController.delete)
        .get("/api/v1/user/:userID/goals", GoalController.getAll)
        .get("/api/v1/user/:userID/goals/:id", GoalController.getByID)
        .post("/api/v1/user/:userID/goals", GoalController.create)
        .patch("/api/v1/user/:userID/goals/:id", GoalController.update)
        .delete("/api/v1/user/:userID/goals/:id", GoalController.delete)
        .get("/api/v1/user/:userID/goals/:goalID/tasks", TaskController.getAll)
        .get("/api/v1/user/:userID/goals/:goalID/tasks/:taskID", TaskController.getByID)
        .post("/api/v1/user/:userID/goals/:goalID/tasks", TaskController.create)
        // .patch("/api/v1/user/:userID/goals/:goalID/tasks", TaskController.updateMultiple)
        .patch("/api/v1/user/:userID/goals/:goalID/tasks/:taskID", TaskController.update)
        .delete("/api/v1/user/:userID/goals/:goalID/tasks/:taskID", TaskController.delete)
};