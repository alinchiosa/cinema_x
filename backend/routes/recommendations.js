var express = require("express");
var request = require("request");

var router = express.Router();

router.get("/get", function(req, res, next) {
  const { title } = req.query;

  request("http://127.0.0.1:5000/?movie=" + title, function(
    error,
    response,
    body
  ) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
    if (body) {
      movieList = body.toString().split(",");
      movieList = movieList.map(movie => {
        movieTitle = movie.split(":")[1];
        return movieTitle;
      });
      res.json({ success: true, movieList: movieList });
    } else res.json({ success: false, message: "no recommendations" });
  });
});

module.exports = router;
