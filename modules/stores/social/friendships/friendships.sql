CREATE TABLE public.friendship (
  relationship circles_db.public.relationship NULL,
  user1 UUID NOT NULL,
  user2 UUID NOT NULL,
  id INT8 NOT NULL DEFAULT unique_rowid(),
  last_interacted_date TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  date_created TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  CONSTRAINT friendship_pkey PRIMARY KEY (user1 ASC, user2 ASC),
  CONSTRAINT friendship_user1_fkey FOREIGN KEY (user1) REFERENCES public."user"(user_foreign_key) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT friendship_user2_fkey FOREIGN KEY (user2) REFERENCES public."user"(user_foreign_key) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE INDEX friendship_id_key (id ASC)
)