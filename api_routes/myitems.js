const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
const userID = req.session.user_id
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

