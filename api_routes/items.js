/*
 * All routes for Items are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

getAllItems = (db, req, res) => {
  const queryParams = [];

  let queryString = `
  SELECT items.*
  FROM items
  JOIN favourites ON items.id = favourites.item_id
  JOIN users ON users.id = favourites.user_id
  `;

  console.log("queryString: ", queryString);
  console.log("queryParams: ", queryParams);

  db.query(queryString, queryParams)
      .then(data => {
        const item = data.rows;
        console.log("item: ", item)
        res.json({ item });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
}


module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log("GET to / - req", req)

    const { filter } = req.body;
    console.log("FILTER: ", filter)

    let query = `SELECT * FROM items`;
    console.log(query);
    db.query(query)
      .then(data => {
        const items = data.rows;
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:itemID", (req, res) => {
    const itemID = req.params.itemID
    console.log("itemID", itemID);

    let queryString = `
    SELECT * FROM items
    WHERE id = $1;
    `;
    console.log("queryString: ", queryString);
    let values = [itemID];
    console.log("values: ", values);

    db.query(queryString, values)
      .then(data => {
        const item = data.rows;
        console.log("item: ", item)
        res.json({ item });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/filter", (req, res) => {
  console.log('reqBody', req.body)



  });

  ///ROUTE FOR UPLOADING NEW ITEM - IT WORKS, PLEASE DON'T ALTER//
  router.post("/", (req, res) => {

    let queryString = `
    INSERT INTO items (title, description, item_photo_url, price)
    VALUES ($1, $2, $3, $4) RETURNING *
    `;
    console.log("queryString: ", queryString);
    const {title, description, price, photo} = req.body;

    let values = [title, description, photo, price];
    console.log("values: ", values);

    db.query(queryString, values)
      .then(data => {
        const item = data.rows;
        console.log("item: ", item)
        res.redirect("/");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/:itemID/delete", (req, res) => {
    const itemID = req.params.itemID
    console.log("itemID", itemID);

    let queryString = `
    DELETE FROM items
    WHERE id = $1
    `;
    console.log("queryString: ", queryString);
    let values = [itemID];
    console.log("values: ", values);

    db.query(queryString, values)
      .then(data => {
        const item = data.rows;
        console.log("item: ", item)
        res.json({ item });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};


// B - GET -  /items
// R - GET -  /items/:id
// E - POST - /items/:id
// A - POST - /items/:id/create
// D - POST - /items/:id/delete
