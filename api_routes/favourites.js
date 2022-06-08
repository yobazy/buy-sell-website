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

  // use placeholder value for userID until login/cookies implementation
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

return router;
};


// B - GET -  /items
// R - GET -  /items/:id
// E - POST - /items/:id
// A - POST - /items/:id/create
// D - POST - /items/:id/delete
