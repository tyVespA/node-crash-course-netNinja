const http = require("http");

// createServer creates a server and takes a callback f that runs every time a request comes in the server.
// In this f we get access to a request obj (req) and response obj (res)
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // writes the content that will be sent back to the browser
  res.write("<h1>homepage</h1>");

  // ends the response and sends everything back to the browser
  res.end();
});

// listen listens for incoming requests, as an argument it takes the port number that is listening to, hostname and a callback f that fires when we start listening
const serverPort = 3000;
server.listen(serverPort, "localhost", () => {
  console.log("Listening for requests on port " + serverPort);
});
