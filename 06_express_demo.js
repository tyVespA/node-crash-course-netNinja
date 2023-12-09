const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

// .get listens to any get request, takes the path that we want to listen to and a function that takes req and res so that we can work with those
app.get("/", (req, res) => {
  // send() is like write() and end()
  // it detects the content and automatically sets the header
  // res.send("<h1>express - homepage</h1>"); sends the h1
  // sendFile is used to send files - by default the path is from the root of the pc, so as a 2nd arg we can pass the root of the project
  res.sendFile("./05_views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./05_views/about.html", { root: __dirname });
});

// REDIRECTS
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 PAGE
// .use is used for middleware fs - in this case it will fire for any request
// express works from top to bottom, if there was no match in the previous functions then this one will fire - so this f must be placed after the other .get()s
app.use((req, res) => {
  res.status(404).sendFile("./05_views/404.html", { root: __dirname });
});
