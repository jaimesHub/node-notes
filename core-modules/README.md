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

# Using Modules 2: Our Own Modules

# Using Module 3: 3rd Party Modules