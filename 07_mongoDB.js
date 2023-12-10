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

// middleware the takes the url encoded data and it passes that into an object that we can use in the req obj
app.use(express.urlencoded({ extended: true }));

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
    // we can sort them with .sort - -1 means to sort them from the newest
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      throw err;
    });
});

// POST REQ
app.post("/blogs", (req, res) => {
  // we get the values for req.body using the urlencoded middleware
  const blog = new Blog(req.body);
  // saves it to the DB
  blog
    .save()
    .then((result) => {
      // once the POST req is submitted, it redirects to the homepage
      res.redirect("/blogs");
    })
    .catch((err) => {
      throw err;
    });
});

// handles the blogs pages, every page has a unique id
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog details" });
    })
    .catch((err) => {
      throw err;
    });
});

// DELETE REQ
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  // delete from the DB
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // we send back json to the browser
      // the delete that we handle on the frontend (in details.ejs) is an ajax request, so we can't redirect but instead have to pass back json
      res.json({ redirect: "/blogs" });
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
