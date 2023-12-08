const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request received");

  // Set header
  res.setHeader("Content-Type", "text/html");

  // Send an HTML file
  fs.readFile("./04_views/index.html", (err, data) => {
    if (err) {
      throw err;
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests..");
});
