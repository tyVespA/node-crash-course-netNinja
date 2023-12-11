const express = require("express");
const Blog = require("../07_models/blog");

// we create a new router, so instead of app.get we all attach to router (router.get)
// we then gotta export the router
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog details" });
    })
    .catch((err) => {
      throw err;
    });
});

router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
