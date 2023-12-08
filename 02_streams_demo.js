// If we need to read or write to a very large file, instead of going tru the whole file we can use streams, they allow to pass smaller chunks of data instead of the whole file

const fs = require("fs");

// createReadStream creates a read stream from the file passed as argument,
// we can pass the encoding type
const readStream = fs.createReadStream("./docs/largerFile.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream("./docs/largerFileWrite.txt");

// .on is an event listener, every time we get a chunk of data we fire the function
readStream.on("data", (chunk) => {
  console.log("--- NEW CHUNK ---");
  console.log(chunk);

  writeStream.write("\n NEW CHUNK \n");
  writeStream.write(chunk);
});

// we can read from a file and write it to another much more easily with a pipe

// piping
readStream.pipe(writeStream);
