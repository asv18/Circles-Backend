CREATE TABLE "circle_post" (
    "id" INT8 UNIQUE NOT NULL DEFAULT unique_rowid() PRIMARY KEY,
    "circle_id" UUID NOT NULL REFERENCES "circle"("id"),
    "poster_fkey" UUID NOT NULL REFERENCES "user"("user_foreign_key"),
    "title" VARCHAR(100) NOT NULL,
    "image" STRING,
    "description" STRING,
    "goal_id" UUID NULL REFERENCES "goal"("id"),
    "task_id" INT8 NULL REFERENCES "task"("id"),
    "likes" INT8 NOT NULL DEFAULT 0,
);