/*
 * All routes for favourites are defined here
 * Since this file is loaded in server.js into api/favourites,
 *   these routes are mounted onto /favourites
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {
router.get("/", (req, res) => {
  // const userID = req.params.userID;
  const userID = req.session.user_id

  let queryString =`
  SELECT * FROM favourites
  JOIN items ON item_id = items.id
  WHERE favourites.user_id = $1`;
  console.log(queryString);

  let values = [userID]
  db.query(queryString, values)
    .then(data => {
      const items = data.rows;
      console.log(items)
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post("/add", (req, res) => {
  console.log(req.body)

  let queryString = `
  UPSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2)
  `;

  console.log("queryString: ", queryString);

  const item_id = req.body.item_id
  const user_id = req.session.user_id;
  console.log(item_id, user_id)

  let values = [user_id, item_id];
  console.log("values: ", values);

  db.query(queryString, values)
    .then(data => {
      const item = data.rows;
      console.log("item added: ", item)
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
