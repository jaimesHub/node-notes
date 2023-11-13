const fs = require("fs");
const http = require("http");
const url = require("url");

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

// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW page!");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT page!");
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   // console.log(productData);
    //   res.writeHead(200, {
    //     "Content-type": "application/json",
    //   });
    //   res.end(data);
    // });

    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "My-own-header": "Hello-World",
    });
    res.end("Page not found!");
  }
});

server.listen(8000, "127.0.0.1", (req, res) => {
  console.log("Listening to requests on port 8000");
});
