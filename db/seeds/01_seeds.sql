-- Users table seeds here
INSERT INTO users (name, email, is_admin) VALUES ('Bazil', 'baz@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Ceilidhe', 'ceilidhemaher@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Taylor', 'taylor.mcleod@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Alice', 'alice@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('Kira', 'kira@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('Micheal', 'mike@gmail.com', false);


-- items table seeds here
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (1, 'Fox', 'A pretty cool fox avatar', '/images/foxavatar.jpeg', 10);
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (1, 'Anime Girl', 'A pretty cool anime girl avatar', '/images/anigirl.jpg', 11);
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (2, 'Dog', 'A pretty cool dog avatar', '/images/dog.jpg', 12);
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (2, 'Anime Boy', 'A pretty cool anime boy avatar', '/images/aniboy.jpeg', 11);
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (3, 'Cat', 'A pretty cool cat avatar', '/images/cat.gif', 13);
INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (3, 'Banana Man', 'A pretty cool banana avatar', '/images/bananaman.webp', 99);

-- favourite table seeds here

INSERT INTO favourites (user_id, item_id) VALUES (1, 1);
INSERT INTO favourites (user_id, item_id) VALUES (2, 2);
INSERT INTO favourites (user_id, item_id) VALUES (3, 3);
