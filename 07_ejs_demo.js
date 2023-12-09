const express = require("express");

const app = express();

// register view engine
// .set lets us configure application settings, like the view engine
app.set("view engine", "ejs");
// setting the views path
app.set("views", "07_views");

app.listen(3000);

app.get("/", (req, res) => {
  // res.sendFile("./05_views/index.html", { root: __dirname });
  // we no longer send a file but we render a view with .render
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

app.use((req, res) => {
  res.status(404).render("404");
});
