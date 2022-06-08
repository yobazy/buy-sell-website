const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // use placeholder value for userID until login/cookies implementation
    const userID = 3
    let queryString =`
    SELECT * FROM items
    WHERE user_id = $1`;
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

