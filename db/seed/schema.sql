drop table if exists texts;

create table texts(
  text_id serial primary key unique,
  body jsonb
);

create table states(
  state_id serial primary key unique,
  phone text,
  location text,
  flavor_text text,
  choices text[]
)
