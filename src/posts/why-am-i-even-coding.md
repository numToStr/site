---
title: Why am I even coding?
date: 2019-16-06
---

I am commerce graduate but was not happy studying commerce. When I was a student I love science and tech stuff but was unable to make it through the science stream in my high school as my grades were not great.

But accidently I met a guy who was in coding stuff and suggest me to try it out. And this gets me as I am already unhappy with my studying.

From that day I started to learn coding and I can proudly say that I am a self taught coder.

Practically, `I switched my career before even starting my career. 😬😬`

![gatsby](../images/gatsby-icon.png)

-   One
-   two

# Hello World

## Hello World

### Hello World

#### Hello World

##### Hello World

###### Hello World

1. One
2. Two
3. three

```js
#!/usr/bin/env node

const http = require("http");

// Port Environment variable
const PORT = process.env.PORT || 5000;

// Creating the node server
const SERVER = http.createServer();

// Firing up the server on selected port
SERVER.listen(PORT);

SERVER.on("listening", () => {
    console.log("[Server]::LISTEN:%s", PORT);
});

// Callback function for checking connecting or error
SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});

/**
 * For Handling unhandled promise rejection
 *
 * If any rejection occurs in the app,
 * then the server will forcefully shutdown
 * Ex: Like if the app is unable to connect to database then the app will shutdown.
 */
process.on("unhandledRejection", reason => {
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    console.log("[Unhandled Rejection]::", reason.message);

    throw reason;
});

process.on("uncaughtException", error => {
    // I just received an error that was never handled,
    // time to handle it and then decide whether a restart is needed
    console.log("[Uncaught Exception]::", error.message);

    throw error;
});
```
