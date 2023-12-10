const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./07_models/blog");

const app = express();

const DB =
  "mongodb+srv://mmpotto:oZnUP8txx49LbkwQ@cluster0.4hqj49k.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then((result) => app.listen(3000))
  .catch((err) => {
    throw err;
  });

app.set("view engine", "ejs");
app.set("views", "07_views");

app.use(express.static("public"));

const blogs = [
  { title: "Blog title 1", snippet: "Lorem ipsum snippet" },
  { title: "Blog title 2", snippet: "Lorem ipsum snippet" },
  { title: "Blog title 3", snippet: "Lorem ipsum snippet" },
];

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// BLOG ROUTES
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
