CREATE TABLE public.circle (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP NULL DEFAULT now():::TIMESTAMP,
  last_interacted_date TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  circle_name STRING NOT NULL,
  image STRING NOT NULL,
  created_by UUID NOT NULL,
  admin UUID NOT NULL,
  CONSTRAINT circle_pkey PRIMARY KEY (id ASC),
  CONSTRAINT circle_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."user"(user_foreign_key),
  CONSTRAINT circle_admin_fkey FOREIGN KEY (admin) REFERENCES public."user"(user_foreign_key)
);

CREATE TYPE "circle_publicity" AS ENUM ('public', 'friends only', 'private');

SELECT "id", CAST("created_at" AS STRING), CAST("last_interacted_date" AS STRING), "circle_name",
"image", "created_by", "admin", "publicity" FROM "circle" WHERE
NOT EXISTS(SELECT 1 FROM "circle_connection" WHERE "user_fkey" = 'ad9d3b2b-1b33-4d7f-a934-ce2b6a5f525d' AND "circle_id" = "id")
OFFSET 0 FETCH NEXT 10 ROWS ONLY;