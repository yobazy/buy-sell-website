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
    const itemID = req.params
    console.log("itemID", itemID);

    let queryString = `
    SELECT * FROM items
    WHERE id = '$1';
    `;
    console.log("queryString: ", query);

    let values = [itemID];
    db.query(queryString, values)
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

  router.post("/:itemID/create", (req, res) => {
    // convert to parametqic
    let query = `
    INSERT INTO items (user_id, title, description, item_photo_url, price)
    VALUES ($1, $2, $3, $4, $5)`;
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

  return router;
};


// B - GET -  /items
// R - GET -  /items/:id
// E - POST - /items/:id
// A - POST - /items/:id/create
// D - POST - /items/:id/delete
