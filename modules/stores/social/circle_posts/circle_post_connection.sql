CREATE TABLE "circle_post_connection" (
  "connection_id" INT8 NOT NULL DEFAULT unique_rowid(),
  "circle_id" UUID NOT NULL REFERENCES "circle"("id") ON DELETE CASCADE,
  "post_id" INT8 NOT NULL REFERENCES "circle_post"("id") ON DELETE CASCADE,
  "posted_at" TIMESTAMP NOT NULL DEFAULT now()::TIMESTAMP,
  PRIMARY KEY ("post_id", "circle_id"),
  UNIQUE ("connection_id")
);