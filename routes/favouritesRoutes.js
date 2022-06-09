const express = require('express');
const app  = express();

module.exports = function(router, database)
 {
app.get('/', (req, res) => {
  res.render("../views/favourites")
});

return app
 };
