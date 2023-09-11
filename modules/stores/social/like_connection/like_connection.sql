CREATE TABLE "like_connection" (
    "id" INT8 NOT NULL PRIMARY KEY DEFAULT unique_rowid(),
    "user_fkey" UUID NOT NULL REFERENCES "user"("user_foreign_key"),
    "comment_id" INT8 NULL REFERENCES "circle_post_comment"("id"),
    "post_connection_id" INT8 NULL REFERENCES "circle_post_connection"("connection_id"),
    "like_status" "like_status" NOT NULL,
);