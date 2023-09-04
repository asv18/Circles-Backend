CREATE TABLE public.task (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  name VARCHAR(100) NOT NULL,
  goal_id UUID NOT NULL,
  start_date DATE NULL DEFAULT current_date(),
  repeat VARCHAR(30) NOT NULL,
  next_date DATE NULL,
  complete BOOL NULL DEFAULT false,
  CONSTRAINT task_pkey PRIMARY KEY (id ASC),
  CONSTRAINT task_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goal(id) ON DELETE CASCADE ON UPDATE CASCADE
)