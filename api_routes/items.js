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
    //console.log("GET to / - req", req)

    const { filter } = req.body;

    let query = `
    SELECT items.id as id, items.title as title, items.description as description, items.item_photo_url as item_photo_url, items.price as price, users.name as user_name, users.email as email
    FROM items
    JOIN users ON items.user_id = users.id
    GROUP BY items.id, users.id
    ORDER BY items.price;
    `;
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
        const items = data.rows;
        console.log("items: ", items)
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/filter", (req, res) => {
    console.log('req.body', req.body);
    console.log('req.body["min-price"]', req.body["min-price"]);
    console.log('req.body["max-price"]', req.body["max-price"]);

    const queryParams = [];
    let queryString = `
    SELECT items.id as id, items.title as title, items.description as description, items.item_photo_url as item_photo_url, items.price as price, users.name as user_name, users.email as email
    FROM items
    JOIN users ON items.user_id = users.id
    `;

    //determine if need to add an AND or a WHERE
    let whereAlreadyExists = false;

    if (req.body["min-price"]) {

      const minPrice = req.body["min-price"];
      queryParams.push(`${minPrice}`);
      queryString += ` WHERE price >= $${queryParams.length}`;
      whereAlreadyExists = true;

    }

    if (req.body["max-price"]) {

      const maxPrice = req.body["max-price"];
      queryParams.push(`${maxPrice}`);

      if (whereAlreadyExists) {
        queryString +=` AND price <= $${queryParams.length}`;
      } else {
        queryString +=` WHERE price <= $${queryParams.length}`;
      }

    }

    queryString += `
    GROUP BY items.id, users.id
    ORDER BY items.price
    `;


    console.log("queryString: ", queryString);
    console.log("queryParams: ", queryParams);

    db.query(queryString, queryParams)
        .then(data => {
          const items = data.rows;
          console.log("items: ", items)
          res.json({ items });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });


  });

  ///ROUTE FOR UPLOADING NEW ITEM - IT WORKS, PLEASE DON'T ALTER//
  router.post("/", (req, res) => {

    let queryString = `
    INSERT INTO items (title, description, item_photo_url, price)
    VALUES ($1, $2, $3, $4) RETURNING *
    `;
    console.log("queryString: ", queryString);
    const {title, description, price, photo} = req.body;

    let values = [title, description, photo, price*100];
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
