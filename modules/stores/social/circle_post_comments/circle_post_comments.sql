CREATE TABLE "circle_post_comment" (
    "id" INT8 NOT NULL PRIMARY KEY DEFAULT unique_rowid(),
    "poster_fkey" UUID NOT NULL REFERENCES "user"("user_foreign_key"),
    "contents" TEXT NOT NULL,
    "time_posted" TIMESTAMP NOT NULL DEFAULT NOW(),
    "post_id" INT8 NOT NULL REFERENCES "circle_post"("id"),
    "parent_id" INT8 NULL,
    "likes" INT8 NOT NULL DEFAULT 0
);