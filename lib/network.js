function favourites() {
  console.log("these are my faves");
  return $.ajax({
    url: "/:userID/favourites"
  });
}
