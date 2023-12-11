const express = require("express");
const router = express.Router();
// importing the controllers
const blogController = require("./10_controllers/blogController");
router.use(express.urlencoded({ extended: true }));

router.get("/blogs", blogController.blog_index);
router.get("/blogs/create", blogController.blog_create_get);
router.post("/blogs", blogController.blog_create_post);
router.get("/blogs/:id", blogController.blog_details);
router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
