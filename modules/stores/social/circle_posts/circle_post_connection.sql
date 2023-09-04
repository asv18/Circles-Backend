CREATE TABLE public.circle_post_connection (
  connection_id INT8 NOT NULL DEFAULT unique_rowid(),
  circle_id UUID NOT NULL,
  post_id INT8 NOT NULL,
  posted_at TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  likes INT8 NOT NULL DEFAULT 0:::INT8,
  CONSTRAINT circle_post_connection_pkey PRIMARY KEY (circle_id ASC, post_id ASC),
  CONSTRAINT circle_post_connection_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circle(id),
  CONSTRAINT circle_post_connection_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.circle_post(id),
  UNIQUE INDEX circle_post_connection_id_key (connection_id ASC)
)