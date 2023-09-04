CREATE TABLE public."user" (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name STRING NOT NULL,
  username STRING NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(12) NULL,
  "registeredAt" DATE NOT NULL DEFAULT current_date(),
  "authID" VARCHAR(128) NOT NULL,
  password VARCHAR(50) NULL,
  photo_url STRING NULL,
  user_foreign_key UUID NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT user_pkey PRIMARY KEY (id ASC),
  UNIQUE INDEX user_username_key (username ASC),
  UNIQUE INDEX user_email_key (email ASC),
  UNIQUE INDEX user_user_foreign_key_key (user_foreign_key ASC)
)