# How Node.js Works: A Look Behind the Scenes

## Node, V8, Libuv and C++
### Node Architecture
- `Node run time` has some dependencies
    + V8 engine: 
        - helps Node understands our Javascript code, or is what converts JS code into machine code that a computer can actually understand
        - uses C++ code besides Javascript
    + libuv
        - An open source library with strong focus on Asynchronous IO.
        - This layer is what gives Node acces to the underlying computer operating system, file system, networking,...
        - It implements 2 important features: `the event loop` and `the thread pool`
        - Event loop is responsible for handling easy tasks like executing callbacks, network IO
        - Thread pool is for more heavy work like file access or compression,...
        - It is completely written in C++, not Javascript
        + http-parser, c-ares, OpenSSL, zlib
- `Node` is a Javascript runtime based on Google's V8 engine

## Processes, Threads and the Thread Pool
### Node Process: Instance of a program in execution on a computer
- When we use Node on computer, it means that there is a Node process running on that computer.
And the program is just a program in execution
### Threads
- Node.js runs in just `one thread` which makes it easy to block  Node applications.
- `single thread` - is basically just a sequence of instructions
- Thread is a box where our code is executed in a computer's processor
- Be careful about `not blocking that thread`
- What happens in a single thread when we start your Node application
    + Initialize program: When the program is initialized, 
    + Execute `top-level` code: all the top level code is executed, which means all the code that is not inside any `callback function`
    + Require modules: All the modules that your app needs are required and all the callbacks are registered
    + `Start EVENT LOOP`: then after all that, the event loop finally starts running
### Thread Pool
- The catch: Some tasks are actually too heavy. They are too expensive to be executed in the event loop because they would then `block the single thread` -> That's where the `thread pool` comes in
- It give us `4 additional threads` that are completely `separate` from the `main single thread`
- We can actually configure it up to 128 threads
- Theses threads together formed a thread pool
- The event loop can automatically offload heavy tasks heavy tasks to the thread pool (behind the scenes)
- Developers can not decide what goes to thread pool
- Handles heavy (`expensive`) tasks (easily block the main thread):
    + File system APIs
    + Cryptography
    + Compression
    + DNS lookups

## The Node.js Event Loop
- The `heart` of Node Architecture
- Context: In a Node process > in the single thread > where the event loop runs
- The event loop is where all the application code that is inside `callback function is executed` (non-top-level code)
- Node.js is build around callback functions
- Node uses an event-driven architecture
    + Events are emitted (e.g. when our app receives a New HTTP request, Time expired, Finished file reading, ...) all these will emit events as soon as they are done with their work
    + Event loop will then pick up these events and call the callback functions that are associated with each event.
    + Event loop receives events each time something important happens. And will then call the necessary callbacks such as we define in our code.
    + `Summary`: Event loop does `orchestration` which simply means that it receives events calls their callback functions and offloads the more expensive tasks to the thread pool.
    + How does it work behind the scenes? In what order are these callbacks executed?
- The Event loop in detail
    + Start the Node Application: event loop starts running right away
    + Event loop has `multiple phases`, `each phase has a callback queue`, which are the callbacks coming from the events that the event loop receives (`4 callback queues`)
        + `First phase` takes care of `callbacks of Expired timers` (e.g. setTimeout() function). If there are callback functions from `timers` that just `expired`, these are the first ones to be processed by the event loop. If a timer expires later during the time when one of the other phases are being processed, then the callback of that timer will only be called as soon as the event loop comes back to this first phase.
            + It works like this for 4 phases.
            + Callbacks in each queue are processed one by one until there are no ones left in the queue and only then, the event loop will enter the next phase.
        + `I/O polling` and `execution of IO callbacks`
            + polling means looking for new IO events that are ready to be processed and putting them into the callback queue
        + `setImmediate callbacks`
            + setImmediate is a special kind of timer that we can use if we want to process callbacks immediately after the I/O polling and execution phase
        + `close callbacks`
            + all close events are processed
            + e.g. when a web server or a websocket shut down
    + 2 Queues
        + nextTick() queue (process.nextTick() queue)
        + microtasks queue (Resolved promises)
        + if there are any callbacks in one of these two queues to be processed, they will be executed right after the current phase of the event loop finishes instead of waiting for the entire loop to finish.
    + Any pending timers or I/O tasks ? NO -> Exit program
- Summary: `Do not block the Event loop`
    + Don't use `sync` versions of functions in `fs, crypto, and zlib` modules in your callback functions
    + Dont perform complex calculations (e.g. loops inside loops)
    + Be careful with JSON in large objects
    + Don't use too complex regular expressions (e.g. nested quantifiers)

## Practice 

### First try
    ```
    const fs = require("fs");

    setTimeout(() => console.log("Timer 1 finished"), 0);
    setImmediate(() => console.log("Immediate 1 finished"));

    fs.readFile("test-file.txt", () => {
    console.log("I/O finished");
    });

    console.log("Hello from the top-level code");
    ```
### Second try
    ```
    const fs = require("fs");

    setTimeout(() => console.log("Timer 1 finished"), 0);
    setImmediate(() => console.log("Immediate 1 finished"));

    fs.readFile("test-file.txt", () => {
    console.log("I/O finished");

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));
    });

    console.log("Hello from the top-level code");
    ```
### Third try
    ```
    const fs = require("fs");

    setTimeout(() => console.log("Timer 1 finished"), 0);
    setImmediate(() => console.log("Immediate 1 finished"));

    fs.readFile("test-file.txt", () => {
    console.log("I/O finished");
    console.log("------------");

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick"));
    });

    console.log("Hello from the top-level code");
    ```
### Fourth try: Thread pool
    ```
    const fs = require("fs");
    const crypto = require("crypto");

    const start = Date.now();
    process.env.UV_THREADPOOL_SIZE = 4;

    setTimeout(() => console.log("Timer 1 finished"), 0);
    setImmediate(() => console.log("Immediate 1 finished"));

    fs.readFile("test-file.txt", () => {
    console.log("I/O finished");
    console.log("------------");

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    });

    console.log("Hello from the top-level code");

    ```

### Fifth try: Thread pool with a synchronous way
    ```
    const fs = require("fs");
    const crypto = require("crypto");

    const start = Date.now();
    process.env.UV_THREADPOOL_SIZE = 2;

    setTimeout(() => console.log("Timer 1 finished"), 0);
    setImmediate(() => console.log("Immediate 1 finished"));

    fs.readFile("test-file.txt", () => {
    console.log("I/O finished");
    console.log("------------");

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password encrypted");
    });

    console.log("Hello from the top-level code");
    ```