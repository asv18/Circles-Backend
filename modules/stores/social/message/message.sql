CREATE TABLE public.conversation_message (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  contents STRING NOT NULL,
  friendship_id INT8 NOT NULL,
  user_fkey UUID NOT NULL,
  reply_id INT8 NULL,
  time_sent TIMESTAMP NOT NULL DEFAULT now():::TIMESTAMP,
  CONSTRAINT conversation_message_pkey PRIMARY KEY (id ASC),
  CONSTRAINT conversation_message_friendship_id_fkey FOREIGN KEY (friendship_id) REFERENCES public.friendship(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT conversation_message_user_fkey_fkey FOREIGN KEY (user_fkey) REFERENCES public."user"(user_foreign_key)
)