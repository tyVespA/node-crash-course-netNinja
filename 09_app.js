const express = require("express");
const mongoose = require("mongoose");
// not using 09_routes anymore after making separate controllers file
// const blogRoutes = require("./09_routes/blogRoutes");
const blogRoutes = require("./10_controllers");

const app = express();

app.use(blogRoutes);
app.set("view engine", "ejs");
app.set("views", "07_views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const DB =
  "mongodb+srv://mmpotto:oZnUP8txx49LbkwQ@cluster0.4hqj49k.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then((result) => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
