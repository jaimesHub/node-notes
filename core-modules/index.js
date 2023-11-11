const fs = require("fs");

/////////////////////////////////
// FILES

// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
*/

// Non-blocking, asynchronous way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log('ERROR WHILE READING START.TXT! 💥');

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(`Contents of ${data1}.txt::`, data2);

    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log("Contents of append.txt::", data3);
      
      console.log("Writing files...");

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, 'utf-8', err => {
        if (err) return console.log('ERROR WHILE WRITING FINAL.TXT! 💥');

        console.log('Your file has been written 😁');
      })
    });
  });
});
console.log("Reading files...");
*/

/////////////////////////////////


