const fs = require("fs");

// Read files
// readFile is async and has 3 arguments:
// 1 - the relative path to the file
// 2 - the optional encoding method (ex. to mutate the buffer to a string)
// 3 - a callback function that has as arguments the error and the data of the file
fs.readFile("./docs/text.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString()); // toString changes the buffer of data to a string - in this case it's not needed since we passed the encoding method utf8
});

// Write files
// writeFile is async and has 3 arguments:
// 1 - the relative path to the file - if the files doesn't exists, it creates it
// 2 - the text that we want to write in the file
// 3 - a callback function

fs.writeFile("./docs/text.txt", "hello 123", () => {
  console.log("File was written");
});

// Delete Files
// before we delete the file we check if it exists with existsSync
if (fs.existsSync("./docs/deleteMe.txt")) {
  fs.unlink("./docs/deleteMe.txt", (err) => {
    if (err) throw err;
    console.log("File deleted");
  });
} else {
  fs.writeFile("./docs/deleteMe.txt", "Delete me", () => {
    console.log("File created");
  });
}

// Create a directory
// we just pass the path and the name of the new dir
// "./" is the current dir
// assets is the name of the new dir

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) throw err;
    console.log("Folder created");
  });
} else {
  // rmdir is used to remove a directory
  fs.rmdir("./assets", (err) => {
    if (err) throw err;
    console.log("Folder deleted");
  });
}
