import UserController from "../stores/user/controller/user.controller.ts";
import GoalController from "../stores/goal/controller/goal.controller.ts";
import TaskController from "../stores/task/controller/task.controller.ts";
import FriendshipController from "../stores/friendships/controller/friendship.controller.ts";

export const api = (router: any) => {
    const sockets = new Map<string, WebSocket>();

    router
        .get("/api/v1/user/authenticate/:authID/", UserController.getByAuth)
        .get("/api/v1/user/:id/", UserController.getByID)
        .post("/api/v1/user/", UserController.create)
        .patch("/api/v1/user/:id/", UserController.update)
        .delete("/api/v1/user/:id/", UserController.delete)
        .get("/api/v1/user/:userID/goals/", GoalController.getAll)
        .get("/api/v1/user/:userID/goals/:id/", GoalController.getByID)
        .post("/api/v1/user/:userID/goals/", GoalController.create)
        .patch("/api/v1/user/:userID/goals/:id/", GoalController.update)
        .delete("/api/v1/user/:userID/goals/:id/", GoalController.delete)
        .get("/api/v1/user/:userID/goals/:goalID/tasks/", TaskController.getAll)
        .get("/api/v1/user/:userID/goals/:goalID/tasks/:taskID/", TaskController.getByID)
        .post("/api/v1/user/:userID/goals/:goalID/tasks/", TaskController.create)
        // .patch("/api/v1/user/:userID/goals/:goalID/tasks", TaskController.updateMultiple)
        .patch("/api/v1/user/:userID/goals/:goalID/tasks/:taskID/", TaskController.update)
        .delete("/api/v1/user/:userID/goals/:goalID/tasks/:taskID/", TaskController.delete)
        .get("/api/v1/user", UserController.getAll)
        .get("/api/v1/user/friendships/:userKey/", UserController.getFriendSkeletons)
        .get("/api/v1/user/:userKey/friendships/", FriendshipController.getFriendshipsOfUser)
        .get("/api/v1/user/:userKey/requests/", FriendshipController.getFriendshipRequestsOfUser)
        .get("/api/v1/user/:userKey1/friendships/:userKey2/", FriendshipController.getFriendship)
        .post("/api/v1/user/:userKey1/friendships/", FriendshipController.createRequest)
        .patch("/api/v1/user/friendships/:id/", FriendshipController.updateFriendship)
        .delete("/api/v1/user/friendships/:id/", FriendshipController.delete)
        .get("/messages", (ctx: any) => {
            if (!ctx.isUpgradable) {
                ctx.throw(501);
            }
            
            const ws = ctx.upgrade();

            ws.onopen = () => {
                console.log("Connected to server");

                const uid = crypto.randomUUID();

                sockets.set(uid, ws);
            }

            ws.onmessage = (m: any) => {
                const data = m.data;

                console.log("Got message from server: ", data);

                for (const client of sockets.values()) {
                    client.send(data);
                }
            };

            ws.onclose = () => console.log("Disconnected from server");
        });
};