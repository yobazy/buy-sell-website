const express = require('express');
const app = express();

module.exports = function(router, database) {
  app.get("/", (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((data) => {
        const user = data.rows[0];
        const templateVars = { user };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  app.post("/login", (req, res) => {
    if (Number(req.body.user)) {
      req.session.user_id = req.body.user;
      return res.redirect('/');
    }
    res.send('Error. UserID must be a number.');
  });

  app.get('/login', (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((data) => {
        const user = data.rows[0];
        const templateVars = { user };
        res.render("login", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  app.get('/sell', (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((data) => {
        const user = data.rows[0];
        const templateVars = { user };
        res.render("sell", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

  return app;
};


