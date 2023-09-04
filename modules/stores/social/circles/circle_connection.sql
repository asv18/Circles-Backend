CREATE TABLE public.circle_connection (
  circle_id UUID NOT NULL,
  user_fkey UUID NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  connection_id INT8 NOT NULL DEFAULT unique_rowid(),
  CONSTRAINT circle_connection_pkey PRIMARY KEY (circle_id ASC, user_fkey ASC),
  CONSTRAINT circle_connection_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circle(id) ON DELETE CASCADE,
  CONSTRAINT circle_connection_user_fkey_fkey FOREIGN KEY (user_fkey) REFERENCES public."user"(user_foreign_key) ON DELETE CASCADE
)