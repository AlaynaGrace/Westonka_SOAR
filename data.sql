CREATE TABLE slips(
  id SERIAL PRIMARY KEY NOT NULL,
  slip_number VARCHAR(120),
  s BOOLEAN,
  o BOOLEAN,
  a BOOLEAN,
  r BOOLEAN,
  date_entered TIMESTAMP,
  student_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(120),
  email VARCHAR(120),
  admin BOOLEAN,
  teacher BOOLEAN,
  homeroom_id INT REFERENCES homerooms(id),
  google_id VARCHAR(120),
  token VARCHAR(1200),
  status BOOLEAN
);

CREATE TABLE homerooms(
  id SERIAL PRIMARY KEY NOT NULL,
  identifier VARCHAR(120)
);

INSERT INTO slips (slip_number) VALUES (3ndkgid6);
INSERT INTO slips (slip_number) VALUES (47ufndks);
INSERT INTO slips (slip_number) VALUES (pld96nw2);
INSERT INTO slips (slip_number) VALUES (0k4mxive);
