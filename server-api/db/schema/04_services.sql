DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
  id SERIAL PRIMARY KEY NOT NULL,
  overview_id INTEGER REFERENCES overview(id),
  boat_id INTEGER REFERENCES boats(id),
  date DATE,
  remark VARCHAR(255)
);