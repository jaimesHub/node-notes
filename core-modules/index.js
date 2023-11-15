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
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
// Loading templates
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// Loading data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Initializing a Server instance
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // const pathName = req.url;
  if (pathname === "/" || pathname === "/overview") {
    // OVERVIEW PAGE
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    // PRODUCT PAGE
    // console.log(query, query.id);
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    // we should not use here because each time we send request, 
    // fs.readFile will block to get data then continue executing other commands.
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
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "My-own-header": "Hello-World",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", (req, res) => {
  console.log("Listening to requests on port 8000");
});
