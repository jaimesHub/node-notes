# NODE NOTES

## SECTION: Introduction to Node.js and NPM
1. core-modules
    1. Synchronous, Asynchronous
    2. Callback function, callback hell
    3. Creating a Simple Web Server, incoming requests, sending response, eventloop
    4. HTML Templating
        - Building the Template
        - Filling the Templates
2. our-own-modules
    - The difference between `regular dependencies` and `development dependencies`
    - Install them either `locally` or `globally` also install them in both places.

3. third-party-modules
    - require/include `third-party-modules` from the NPM registry
    - working with `npm` packages: versioning, updating, deleting packages, package.json, package-lock.json

## SECTION: Introduction to BE Development
1. How the Web Works
- Request-response model / Client-Server Architecture
- Protocol (HTTP/HTTPS) + Domain name + Resource
- DNS, DNS lookup
- Protocol (HTTP/HTTPS) + IP Address + Port number (Default: 443 for HTTPS, 80 for HTTP)
- Client <--> TCP/IP socket connection <--> Server
- HTTP request
    ```
    Start line: HTTP method + request target + HTTP version
    HTTP request headers
    Request body (only when sending data to servr, e.g. POST)
    ```
- HTTP response
    ```
    Start line: HTTP version + status code + status message
    HTTP request headers
    Request body (most responses)
    ```
- index.html is the first to be loaded -> Scanned for assets: JS, CSS, images -> Process is repeated for each file

2. HTTP in action
- Dev Tools (F12) > Network tab

3. FE & BE Web Development
- Browser (Front-end) vs Web server
- Static server
- Dynamic server
- Database
- Front-end stack
- Back-end stack

4. Static & Dynamic & API
- Static websites
    - Javascript != Dynamic
- Dynamic websites
    - Server-side rendering process
    - Web application = Dynamic website + Functionality
- API-Powered websites
    - Building api: Database -> Get data -> JSON
    - Consuming API: JSON <--> Browser -> Build website (React/Angular) -> User Interfaces
- One API, Many Consumers
    - API -- Send JSON --> Browser
    - API -- Send JSON --> Native Mobile APP: IOS
    - API -- Send JSON --> Native Mobile APP: ANDRIOD
    - API -- Send JSON --> Native APP: MacOS
    - API -- Send JSON --> Native APP: Windows

## SECTION: How Node.js Works
1. Node, V8, Libuv & C++

2. Processes, Threads and the Thread Pool

3. The Node.js Event Loop

4. The Event Loop in practice

5. Events and Event-Driven Architecture

6. Events in Practice

7. Introduction to Streams

8. Streams in Practice

9. How Requiring Modules Really Works

10. Requiring Modules in Practice

## SECTION: Asynchronous Javascript

## SECTION: Express - Let's build a project