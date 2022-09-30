var express = require("express");
var app = express();
var db = require("./db.json");

app.get("/graphics-cards", (req, res, next) => {
    res.json(db);
   });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});