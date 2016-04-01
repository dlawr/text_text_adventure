drop table if exists texts;

create table texts(
  text_id serial primary key unique,
  body jsonb
);
