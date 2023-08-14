import UserController from "../stores/user/controller/user.controller.ts";
import GoalController from "../stores/local/goal/controller/goal.controller.ts";
import TaskController from "../stores/local/task/controller/task.controller.ts";
import FriendshipController from "../stores/social/friendships/controller/friendship.controller.ts";
import MessageController from "../stores/social/message/controller/message.controller.ts";
import messageService from "../stores/social/message/service/message.service.ts";
import CirclesController from "../stores/social/circles/controller/circles.controller.ts";

export const api = (router: any) => {
    const sockets = new Map<string, [WebSocket, string]>();

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
        .get("/ws/v1/messages/:friendshipID/", (ctx: any) => {
            if (!ctx.isUpgradable) {
                ctx.throw(501);
            }
            
            const ws = ctx.upgrade();
            let uid = "";

            const friendshipID = ctx.params.friendshipID;
    
            ws.onopen = () => {
                console.log("User connected to server", friendshipID);
    
                uid = crypto.randomUUID()
    
                sockets.set(uid, [ws, friendshipID]);

                // const messages = await messageService.getAll(friendshipID);

                // console.log(messages);

                // ws.send(messages);
            }
    
            ws.onmessage = async (m: any) => {
                let data = m.data;
    
                console.log("Got message on server", friendshipID);

                data = await messageService.createFromSocket(data);
    
                for (const client of sockets.values()) {
                    if (client[1] == friendshipID) {
                        client[0].send(data.toString());
                    }
                }
            };
    
            ws.onclose = () => {
                console.log("Disconnected from server", friendshipID)
    
                sockets.delete(uid);
            };
        })
        .get("/api/v1/messages/:friendshipID/:offset/", MessageController.getAll)
        .post("/api/v1/messages/:friendshipID/", MessageController.create)
        .get("/api/v1/circles/:userKey/", CirclesController.getCirclesOfUser)
        .get("/api/v1/circles/:circleID/users/", CirclesController.getUsersOfCircle)
        .post("/api/v1/circles/:circleID/users/:userKey/", CirclesController.createCircleConnection)
        .post("/api/v1/circles/", CirclesController.createCircle)
};