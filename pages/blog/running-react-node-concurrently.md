---
title: Running React and Node.js in one shot with Concurrently!
date: 2019-07-22
tags:
    [
        "node",
        "nodejs",
        "npm",
        "package",
        "concurrently",
        "react",
        "reactjs",
        "workflow",
    ]
type: post
---

Often time working on a full stack project can be intimidating. I often found myself in the same situation whether it is a personal or proffesional project. When I started to work with React and Node.js, the first question that just came up was, How do I even **connect** and **run** these two together?

This will be two part series where we look at different approaches to run React and Node.js in development environment.

-   [Connecting](#proxy-connection) & [Running with Concurrently](#using-concurrently) (this post)
-   [Using Docker](/blog/running-react-node-docker) (second post)

<a name="proxy-connection"></a>

Connecting React to Node.js (also works for any backend) is fairly easy and commonly known as React Proxy. You just need to add `proxy` field in your `package.json` of your React project and point it to your development backend server.

```jsonc
// package.json
{
    // ...
    "proxy": "http://localhost:5000"
    // ...
}
```

If you want to learn to more just [click here](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development).

Running React and Node.js is more complicated than connecting. This will be two part series where we look at different approaches to run both of them in parallel. Both approches are different in many ways i.e. tools used, folder structure.

<a name="using-concurrently"></a>

### Using concurrently

[Concurrently](https://www.npmjs.com/package/concurrently) is a package which can run multiple npm scripts simultaneously.

<a name="setting-project"></a>

#### ~ Initial setup

```bash
$ mkdir awesome_project && cd awesome_project && npm init -y
```

This will create a `package.json` in our project with some default options.

#### ~ Creating react app

```bash
$ npx create-react-app client
```

This will create a folder named _client_ which holds our react app.

#### ~ Some Node.js code

Create `index.js` in root of your project and paste the following code if you don't have server setup.

```javascript
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
SERVER.on("error", (error) => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});
```

#### ~ Installing concurrently

```bash
npm i -D concurrently
```

To make concurrently work with React and Node, we have to add some script in `package.json`.

```jsonc
{
    // ...
    "scripts": {
        "server": "node index.js",
        // For nodemon users
        // "server": "nodemon index.js",
        "client": "npm start --prefix client",
        "dev": "concurrently \"npm run server\" \"npm run client\""
    }
    // ...
}
```

Finally, we'll have a folder structure somewhat like this.

```bash
> awesome_project
    > node_modules
    > client # This is our react front-end and else will be our node.js backend
        > node_modules
        > src
        - package.json
    - index.js
    - package.json
```

Now `dev` script will run both React and Node.js app in our project and the [proxy](#proxy-connection) will connect both of them.

```bash
$ npm run dev
```

Using concurrently is perfectly fine for most of the developer (this is also the same approach which I used initially). But It has one problem that I find annoying which is **folder structure** (might be different for you).

In the [second post](/blog/running-react-node-docker) we'll be looking at the docker way. So, If you don't know docker just stay here.
