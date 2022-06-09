const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    let queryString = `
    SELECT * FROM items
    WHERE user_id = $1`;
    let values = [userID];
    db.query(queryString, values)
      .then(data => {
        const items = data.rows;
        console.log(items);
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {
    const itemID = req.body.itemID;
    console.log("itemID", itemID);

    let queryString = `
    DELETE FROM items
    WHERE id = $1
    `;
    console.log("queryString: ", queryString);
    let values = [itemID];
    console.log("values: ", values);

    db.query(queryString, values)
      .then(() => {
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

