import UserController from "../stores/user/controller/user.controller.ts";
import GoalController from "../stores/local/goal/controller/goal.controller.ts";
import TaskController from "../stores/local/task/controller/task.controller.ts";
import FriendshipController from "../stores/social/friendships/controller/friendship.controller.ts";
import MessageController from "../stores/social/message/controller/message.controller.ts";
import messageService from "../stores/social/message/service/message.service.ts";
import CirclesController from "../stores/social/circles/controller/circles.controller.ts";
import CirclePostsController from "../stores/social/circle_posts/controller/circle_posts.controller.ts";
import CommentController from "../stores/social/circle_post_comments/controller/comment.controller.ts";

export const api = (router: any) => {
    const sockets = new Map<string, [WebSocket, string]>();

    router
        .post("/api/v1/user/authenticate/", UserController.getByAuth)
        .post("/api/v1/user/", UserController.getByID)
        .post("/api/v1/user/new/", UserController.create)
        .patch("/api/v1/user/", UserController.update)
        .delete("/api/v1/user/", UserController.delete)
        .post("/api/v1/user/goals/", GoalController.getAll)
        .post("/api/v1/user/goals/get/:id/", GoalController.getByID)
        .post("/api/v1/user/goals/new/", GoalController.create)
        .patch("/api/v1/user/goals/:id/", GoalController.update)
        .delete("/api/v1/user/goals/:id/", GoalController.delete)
        .post("/api/v1/user/goals/:goalID/tasks/", TaskController.getAll)
        .post("/api/v1/user/goals/:goalID/tasks/get/:taskID/", TaskController.getByID)
        .post("/api/v1/user/goals/:goalID/tasks/new/", TaskController.create)
        // .patch("/api/v1/user/:userID/goals/:goalID/tasks", TaskController.updateMultiple)
        .patch("/api/v1/user/goals/:goalID/tasks/:taskID/", TaskController.update)
        .delete("/api/v1/user/goals/:goalID/tasks/:taskID/", TaskController.delete)
        .get("/api/v1/user", UserController.getAll)
        .post("/api/v1/user", UserController.getAllNotInCircle)
        .post("/api/v1/user/friendships/skeletons/", UserController.getFriendSkeletons)
        .post("/api/v1/user/friendships/", FriendshipController.getFriendshipsOfUser)
        .post("/api/v1/user/requests/", FriendshipController.getFriendshipRequestsOfUser)
        .post("/api/v1/user/friendships/individual/", FriendshipController.getFriendship)
        .post("/api/v1/user/friendships/create/", FriendshipController.createRequest)
        .patch("/api/v1/user/friendships/update/", FriendshipController.updateFriendship)
        .delete("/api/v1/user/friendships/", FriendshipController.delete)
        .get("/ws/v1/messages/", (ctx: any) => {
            if (!ctx.isUpgradable) {
                ctx.throw(501);
            }
            
            const ws = ctx.upgrade();
            let uid = "";

            let friendshipID = "";
    
            ws.onopen = () => {    
                uid = crypto.randomUUID();

                sockets.set(uid, [ws, ""]);
            }
    
            ws.onmessage = async (m: any) => {
                let data = JSON.parse(m.data);

                if (data["type"] == "connection_id") {
                    friendshipID = data["friendship_id"];

                    sockets.set(uid, [ws, friendshipID]);
                    console.log("User connected to server", friendshipID);
                }
                else if (data["type"] == "message" && friendshipID != "") {
                    console.log("Got message on server", friendshipID);

                    data = await messageService.createFromSocket(data);
        
                    for (const client of sockets.values()) {
                        if (client[1] == friendshipID) {
                            client[0].send(data.toString());
                        }
                    }
                }
            };
    
            ws.onclose = () => {
                console.log("Disconnected from server", friendshipID)
    
                sockets.delete(uid);
            };
        })
        .post("/api/v1/messages/:offset/", MessageController.getAll)
        .post("/api/v1/messages/new/", MessageController.create)
        .post("/api/v1/circles/query/", CirclesController.queryCircles)
        .post("/api/v1/user/circles/", CirclesController.getCirclesOfUser)
        .post("/api/v1/user/circles/posts/", CirclePostsController.getUserPosts)
        .post("/api/v1/circles/", CirclesController.getCircleById)
        .delete("/api/v1/circles/", CirclesController.deleteCircle)
        .post("/api/v1/circles/users/", CirclesController.getUsersOfCircle)
        .post("/api/v1/users/circles/connect/", CirclesController.createCircleConnection)
        .post("/api/v1/circles/new/", CirclesController.createCircle)
        .post("/api/v1/circles/posts/", CirclePostsController.getCirclePosts)
        .post("/api/v1/user/posts/", CirclePostsController.createCirclePost)
        .delete("/api/v1/circles/posts/", CirclePostsController.deleteCirclePost)
        .patch("/api/v1/circles/posts/", CirclePostsController.updateCirclePost)
        .post("/api/v1/circles/posts/comments/", CommentController.getComments)
        .post("/api/v1/circles/posts/comments/children/", CommentController.getChildComments)
        .post("/api/v1/circles/posts/comments/new/", CommentController.createComment)
        .patch("/api/v1/circles/posts/comments/", CommentController.updateComment)
        .delete("/api/v1/circles/posts/comments/", CommentController.deleteComment)
        .post("/api/v1/circles/posts/likepost/", CirclePostsController.updateLikeCirclePost)
        .post("/api/v1/circles/posts/comments/likecomment/", CommentController.updateLikeComment)
};