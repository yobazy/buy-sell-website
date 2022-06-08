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
const favouritesApiRoutes = require("./api_routes/favourites");


// Content

// const usersRoutes = require("./routes/users");
// const itemsRoutes = require("./routes/items");
// const favouritesRoutes = require("./routes/favourites");

// Mount all resource routes

// API routes
app.use("/api/users", usersApiRoutes(db));
app.use("/api/items", itemsApiRoutes(db));
app.use("/api/favourites", favouritesApiRoutes(db));

// Content Routes
// app.use("/users", itemsRoutes(db));
// app.use("/items", itemsRoutes(db));
// app.use("/favourites", favouritesRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  res.render("index");
});

app.get('/items', (req, res) => {
  res.render('items');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/sell', (req, res) => {
  res.render('sell');
});

app.get('/favourites', (req, res) => {
  res.render('favourites');
});

app.get('/myitems', (req, res) => {
  res.render('myitems');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.post("/login", (req, res) => {
  // user input password (unsused)
  let inputPass = req.body['password'];

  req.session.user_id = 2
  res.render('index')
});
