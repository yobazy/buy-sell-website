/*
 * All routes for Items are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {
router.get("/:userID/favourites", (req, res) => {
  const userID = req.params.userID;
  let queryString =
`SELECT * FROM favourites WHERE user_id = $1`
  console.log(queryString);
  let values = [userID]
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

return router;
};


// B - GET -  /items
// R - GET -  /items/:id
// E - POST - /items/:id
// A - POST - /items/:id/create
// D - POST - /items/:id/delete
