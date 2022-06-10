const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //My Items Function - Allows User to See Items They've Uploaded//
  router.get("/", (req, res) => {
    const userID = req.session.user_id;

    let queryString = `
    SELECT * FROM items
    WHERE user_id = $1`;

    let values = [userID];
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

  //Delete Items Function - Allows User to Delete Their Item//
  router.post("/delete", (req, res) => {
    const itemID = req.body.itemID;

    let queryString = `
    DELETE FROM items
    WHERE id = $1
    `;

    let values = [itemID];
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

  //Sold Function - Allows User to Mark Their Item as Sold//
  router.post("/sold", (req, res) => {

    const itemID = req.body.itemID;

    let queryString = `UPDATE items
    SET sold_status = true
    WHERE id = $1`;

    let values = [itemID];
    db.query(queryString, values)
    .then (() => {
      res.send(200);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

