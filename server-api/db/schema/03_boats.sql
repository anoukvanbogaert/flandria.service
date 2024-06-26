DROP TABLE IF EXISTS boats CASCADE;
CREATE TABLE boats (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  boat_name VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  delivery_date TIMESTAMP
);