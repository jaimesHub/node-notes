# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023
# USING MODULES 1: Core Modules

## A very first nodejs program
- nodejs.org/docs
- `File System`

## Synchronous Way: Reading and Writing Files
- Module `fs`
    + Reading Files: `fs.readFileSync()`
    + Writing Files: `fs.writeFileSync()`
- ES6: `const`

## Asynchronous way: Blocking and Non-blocking
- Synchronous (also called `blocking code`)
    + Reading Files: `fs.readFileSync()`
    + Writing Files: `fs.writeFileSync()`
- Asynchronous (also called `non-blocking code`)
    + In asynchronous code, we upload `heavy work` to basically be worked on `in the background`. And then, `once that work is done`, a `callback function` that we `register` before is `called to handle the result`. And during all that time, the rest of the code can still be executing without being blocked by the heavy task, which is now running in the background.
    + Node.JS Process
    + `Note`: when we use callbacks in our code that doesn't automatically make it asynchronous (`Callback != Asynchronous`)
    + Example: `fs.readFile` and `fs.writeFile`
    + How to avoid `Callback hell`? -> Using `Promises` or `Async/Await`

## Creating a Simple Web Server
- module `http`
- Part 1: `Creating a server` instance
    + createServer(callback_func): accept `a callback function` which will be fired off each time `a new request hits our server`. And `this callback function` gets `access` to `two` very important and fundamental `variables`. It is the `request variable` (incoming requests), and a `response variable` (sending responses).
    + callback function: `callback_func`
        ```
            calback_func: (req, res) => {
                res.end("Hello from the server!");
            }
        ```
    +
- Part 2: `Listening to incoming requests from the Client`
    + listen(): accepts a couple of parameters the first one is the `PORT`, the next one is `a sub-address on a certain host` (localhost or 127.0.0.1 by default). And as `an optional argument`, we can also pass in a callback function, which will be run as soon as the server actually starts listening (simply display a message that the server has been started.)
    + Code
        ```
        server.listen(8000, "127.0.0.1", (req, res) => {
            console.log("Listening to requests on port 8000");
        });
        ```
    + Running the application
        ```
        $ node index.js
        ```
    + Event loop
    + On browser: Hit `127.0.0.1:8000` to see its response
    + Analyze what happened
        - We created our server, using `createServer` and passed in` a callback function` that is executed each time that a new request hits the server, and then we started listening for incoming requests on the local host IP, and then on port 8000. 
        - Once we had all this running, we actually did the request by hitting that url. So then, under the hood of NodeJS `an event was fired`, this event then made it so this callback function was called.
- Note:
    + `Part 1`: Each time that a new request hits our server, this callback function (`calback_func`) here will get called, and the callback function will have access to the request object (`req`) which holds all kinds of stuff like the request `url`, and a bunch of other stuff. On the other hand, this response object (`res`) here gives us a lot of tools basically for dealing with the response, so for sending out the response.
    + `Part 2`: After creating a Server instance, it listens at `127.0.0.1:8000`

## Routing
- Routing basically means implementing different actions for different URLs.
- First step: be able to analyze the URL => using `URL` module
    ```
    const url = require("url");
    // ...
    console.log(req.url);
    ```
- Implement the routing
    + Test with "/" or "/overview"
    + Test with "/product"
    + Test with any words such as "/random123ddd"
    + Add `status code` & `header`
- Note that: 
    + With `Content-type`, if you pass `text/html` then your response will be HTML.

## Building a (Very) Simple API
- `Concept of API` is a service from which we can request some data
so in this case, the data that the user wants to request is data about the products that we are offering in this node farm, so in this project.
- Check `/api`
- Using global variable `__dirname` to read a file
- Telling the browser that we're sending back JSON
    ```
    {
        "Content-type": "application/json",
    }
    ```
- Problem: Each time someone hits `/api` requests on our server, `data.json` will be read once and once again => we need to handle it read just one time using `readFileSync`
# Using Modules 2: Our Own Modules

# Using Module 3: 3rd Party Modules