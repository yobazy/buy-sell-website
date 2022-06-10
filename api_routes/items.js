const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //Main Page - Displays All Items//
  router.get("/", (req, res) => {
    const { filter } = req.body;

    let query = `
    SELECT items.id as id, items.title as title, items.description as description, items.item_photo_url as item_photo_url, items.price as price, users.name as user_name, users.email as email, items.sold_status as sold_status
    FROM items
    JOIN users ON items.user_id = users.id
    GROUP BY items.id, users.id
    ORDER BY items.price;
    `;

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

  //Isolates a Specific Item Based on ID//
  router.get("/:itemID", (req, res) => {
    const itemID = req.params.itemID;

    let queryString = `
    SELECT * FROM items
    WHERE id = $1;
    `;

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

  //Filter Function - Allows Filtering by Price//
  router.post("/filter", (req, res) => {
    const queryParams = [];

    let queryString = `
    SELECT items.id as id, items.title as title, items.description as description, items.item_photo_url as item_photo_url, items.price as price, users.name as user_name, users.email as email
    FROM items
    JOIN users ON items.user_id = users.id
    `;

    let whereAlreadyExists = false;

    if (req.body["min-price"]) {

      const minPrice = req.body["min-price"] * 100;
      queryParams.push(`${minPrice}`);
      queryString += ` WHERE price >= $${queryParams.length}`;
      whereAlreadyExists = true;

    }

    if (req.body["max-price"]) {

      const maxPrice = req.body["max-price"] * 100;
      queryParams.push(`${maxPrice}`);

      if (whereAlreadyExists) {
        queryString += ` AND price <= $${queryParams.length}`;
      } else {
        queryString += ` WHERE price <= $${queryParams.length}`;
      }
    }

    queryString += `
    GROUP BY items.id, users.id
    ORDER BY items.price
    `;

    db.query(queryString, queryParams)
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

  //Upload new Item Function//
  router.post("/", (req, res) => {

    let queryString = `
    INSERT INTO items (user_id, title, description, item_photo_url, price)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;

    const { title, description, price, photo } = req.body;
    const user_id = req.session.user_id;

    let values = [user_id, title, description, photo, price * 100];
    db.query(queryString, values)
      .then(data => {
        const item = data.rows;
        res.redirect("/");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

