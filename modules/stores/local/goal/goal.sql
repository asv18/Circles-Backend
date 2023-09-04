CREATE TABLE public.goal (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  owner UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL DEFAULT current_date(),
  finish_date DATE NOT NULL,
  progress INT8 NOT NULL,
  description VARCHAR(500) NULL,
  CONSTRAINT goal_pkey PRIMARY KEY (id ASC),
  CONSTRAINT goal_owner_fkey FOREIGN KEY (owner) REFERENCES public."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
)