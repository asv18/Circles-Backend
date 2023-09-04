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
)