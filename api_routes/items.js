/*
 * All routes for Items are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
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

  router.get("/:itemID/create", (req, res) => {
    const itemID = req.params.itemID
    console.log("itemID", itemID);

    let queryString = `
    INSERT INTO items (user_id, title, description, item_photo_url, price)
    VALUES ($1, $2, $3, $4, $5)
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
