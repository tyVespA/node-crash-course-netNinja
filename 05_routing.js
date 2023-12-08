const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Set header
  res.setHeader("Content-Type", "text/html");

  let path = "./05_views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      // set the status code to 200. 200 means all is good
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    // REDIRECT CASE
    // if i no longer have the page /about-me but only /about:
    case "/about-me":
      res.statusCode = 301; // 301 is the redirect code
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Request received");
});
