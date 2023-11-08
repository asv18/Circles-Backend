CREATE TABLE public.circle_post (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  poster_fkey UUID NOT NULL,
  title STRING NOT NULL,
  image STRING NULL,
  description STRING NULL,
  goal_id UUID NULL,
  task_id INT8 NULL,
  CONSTRAINT circle_post_pkey PRIMARY KEY (id ASC),
  CONSTRAINT circle_post_poster_fkey_fkey FOREIGN KEY (poster_fkey) REFERENCES public."user"(user_foreign_key) ON DELETE CASCADE,
  CONSTRAINT circle_post_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goal(id) ON DELETE CASCADE,
  CONSTRAINT circle_post_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE
);