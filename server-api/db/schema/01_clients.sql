DROP TABLE IF EXISTS clients CASCADE;
CREATE TABLE clients (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
