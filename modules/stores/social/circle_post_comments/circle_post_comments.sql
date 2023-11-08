CREATE TABLE "circle_post_comment" (
    "id" INT8 NOT NULL PRIMARY KEY DEFAULT unique_rowid(),
    "poster_fkey" UUID NOT NULL REFERENCES "user"("user_foreign_key") ON DELETE CASCADE,
    "contents" TEXT NOT NULL,
    "time_posted" TIMESTAMP NOT NULL DEFAULT NOW(),
    "post_connection_id" INT8 NULL REFERENCES "circle_post_connection"("connection_id") ON DELETE CASCADE,
    "parent_id" INT8 NULL,
    "likes" INT8 NOT NULL DEFAULT 0
);