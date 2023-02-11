//jshint esversion:6

const express = require("express");
const bodyParserer = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

app.set("view engine", "ejs");

app.use(bodyParserer.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  // console.log(req.body);
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Server started onm port 3000");
});
