const express = require("express");

const app = express();

// register view engine
// .set lets us configure application settings, like the view engine
app.set("view engine", "ejs");
// setting the views path
app.set("views", "07_views");

app.listen(3000);

const blogs = [
  { title: "Blog title 1", snippet: "Lorem ipsum snippet" },
  { title: "Blog title 2", snippet: "Lorem ipsum snippet" },
  { title: "Blog title 3", snippet: "Lorem ipsum snippet" },
];

app.get("/", (req, res) => {
  // res.sendFile("./05_views/index.html", { root: __dirname });
  // we no longer send a file but we render a view with .render
  // i can pass data from this handler into the view by passing an object as the 2nd param
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
