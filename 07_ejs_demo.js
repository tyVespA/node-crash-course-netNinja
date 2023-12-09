const express = require("express");
const morgan = require("morgan");

const app = express();

// register view engine
// .set lets us configure application settings, like the view engine
app.set("view engine", "ejs");
// setting the views path
app.set("views", "07_views");

app.listen(3000);

// custom middleware
// .next tells the server we are done with the middleware and we can move one - otherwise it will stay stuck in the middleware
app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: " + req.hostname);
  console.log("path: " + req.path);
  console.log("method: " + req.method);
  next();
});

// middleware & static files (ex. css file)
// by passing "public" now everything in the public folder will be available in the front end
app.use(express.static("public"));

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
