-- Users table seeds here
INSERT INTO users (name, email, is_admin) VALUES ('Bazil', 'baz@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Ceilidhe', 'ceilidhemaher@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Taylor', 'taylor.mcleod@gmail.com', true);
INSERT INTO users (name, email, is_admin) VALUES ('Spade the Cat', 'alice@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('Lyanite', 'Lira@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('-RoFleX-', 'mike@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('Julio Summerpaw', 'julio@gmail.com', false);
INSERT INTO users (name, email, is_admin) VALUES ('Mezillo Myker', 'mezz@gmail.com', false);


-- items table seeds here
INSERT INTO items (user_id, title, description, item_photo_url, price, sold_status) VALUES (2, 'Fox', 'A pretty cool fox avatar', '/images/foxavatar.jpeg', 1000, true);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (5, 'Anime Girl', 'A pretty cool anime girl avatar', '/images/anigirl.webp', 5000);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (5, 'Woof', 'This is a general canine avatar I have made that has a lot of customizing sliders and built for in mind for anyone to make about any cute canine species or even other species that one may like to change to. Example you can create the neck to be more arched/feral and widen the nose and body to fit more like a Hyena.', '/images/dog2avatar.gif', 3500);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (6, 'Anime Boy', 'A pretty cool anime boy avatar', '/images/aniboy.jpeg', 7500);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (8, 'Banana Cat', 'yes', '/images/bananacat.webp', 6999);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (4, 'The Awwww', 'Just a cute furry otter model for VRC (VRChat) and CVR (Chillout VR) ! The package is full ready to use (very easy) and comes with tutorials ! It gets a lot of free updates and improvements overtime, stay in touch in Discord <3', '/images/aww.gif', 8999);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (5, 'project Lana', 'love yourself

VRChat SDK 3.0 Unity 2019.4.31f1 Lana Updated to Physics Bones.', '/images/lana.png', 9900);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (5, 'Nynx (3.0) + Quest Version PHYSBONES', '↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝

Nynx (3.0) by Lyanite ADDED PHYSBONES TO PC + QUEST

↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝↝

✔ Quest compatible unitypackage included

✔ ADDED PHYSBONES - Headpat + Hair stretch animation included

✔ Full body ready

✔ Toggles: Mask, Hat/Ears, Pants-Shorts, Shoes

✔ Extras: Blade, Robot/Human Arm, 2 Springjoints, Drawing Pencil'
, '/images/mynx.gif', 21.99);

INSERT INTO items (user_id, title, description, item_photo_url, price) VALUES (6, '๑ஓ── Unspeaking Avatar! ──ஓ๑', '๑ஓ──── Silent ─────ஓ๑
My 2022 project I have been working on is finally ready to release!
This Male was designed with the idea of simplicity and variety without any unity work needed to make edits. Most if not all his textures and materials in the package can all be changed in game. With over 157 animations Clothes all have separate menus to change anything that is desired. I hope you guys like him!', '/images/aniboy2.webp', 2799);

-- favourite table seeds here
INSERT INTO favourites (user_id, item_id) VALUES (1, 1);
INSERT INTO favourites (user_id, item_id) VALUES (2, 2);
INSERT INTO favourites (user_id, item_id) VALUES (3, 3);
