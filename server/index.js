require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { getListingInfo, getBookedDates } = require("../database");
const fs = require("fs");
const fullPath = __dirname + "/../client/dist/index.html";
const port = process.env.PORT || 3001;
const app = express();
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + "/../client/dist"));

app.get("/listingInfo/:id", (req, res) => {
  //should give listingId 10001 back to the client when page first renders

  let { id } = req.params;

  getListingInfo(id, (err, results) => {
    if (err) {
      res.status(404).end("NOT FOUND");
      console.log("err", err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/getBookedDates/:id", (req, res) => {
  let { id } = req.params;

  getBookedDates(id, (err, results) => {
    if (err) {
      res.status(404).end("NOT FOUND");
    } else {
      res.status(202).json(results);
    }
  });
});
app.get("/:id", (req, res) => {
  fs.readFile(fullPath, "utf8", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.end(results);
    }
  });
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});

module.exports = app;
