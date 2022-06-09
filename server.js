// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("cookie-session");
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: 'session',
    keys: ['banana']
  }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// APIs
const usersApiRoutes = require("./api_routes/users");
const itemsApiRoutes = require("./api_routes/items");
console.log('itemsroute', itemsApiRoutes);
const favouritesApiRoutes = require("./api_routes/favourites");
const myItemsRoutes = require("./api_routes/myitems");
const users = require("./api_routes/users");



// Content

// const usersRoutes = require("./routes/users");
// const itemsRoutes = require("./routes/items");
// const favouritesRoutes = require("./routes/favourites");

// Mount all resource routes

// API routes
app.use("/api/users", usersApiRoutes(db));
app.use("/api/items", itemsApiRoutes(db));
app.use("/api/favourites", favouritesApiRoutes(db));
app.use("/api/myitems", myItemsRoutes(db));

// Content Routes
// app.use("/users", itemsRoutes(db));
// app.use("/items", itemsRoutes(db));
// app.use("/favourites", favouritesRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
    .then((data) => {
      const user = data.rows[0];
      const templateVars = { user };
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.post("/login", (req, res) => {
  if (Number(req.body.user)) {
  req.session.user_id = req.body.user;
  return res.redirect('/');
  }
res.send('Error. UserID must be a number.')
});

app.get('/login', (req, res) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
  .then((data) => {
    const user = data.rows[0];
    const templateVars = { user };
    res.render("login", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

app.get('/sell', (req, res) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
  .then((data) => {
    const user = data.rows[0];
    const templateVars = { user };
    res.render("sell", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

app.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/');
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
