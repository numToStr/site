---
title: Node.js environment variables! The Right Way.
date: 2019-07-12
spoiler: There is always a better way to do something.
tags: ["node", "nodejs", "process", "environment variables"]
type: post
---

Environment variables are very fundamental part of developing with Node.js or any server side language. They always contains very sensitive data and doesn't meant to be shared with outside world. You have to make sure that your server is properly configured to make use of correct variables for both development and production environments. Any mistake can lead your server to crash.

Working with environment variable in Node.js is very easy and simple. This post will walk you through the different approaches of using environment variables in Node.js.

If you want to learn about environment variables in Node.js in click [here](https://nodejs.org/docs/latest/api/process.html#process_process_env).

<a name="using-package-json"></a>

## 1. Using package.json

You are thinking how? But you can pass `key=value` pairs directly in the npm scripts in the _package.json_. This is a valid a place to put environment variable but _**not a secure**_ place.

Below is an example of setting Node.js execution environment to production on the npm's start script.

**NOTE:** This will probably won't work with Windows OS.

```json
{
    ...
    "scripts": {
        "start": "NODE_ENV=production node bin/www.js"
    }
    ...
}
```

I also use this approach when I work with [debug](https://github.com/visionmedia/debug) module or setting the Node.js execution environemnt. Some points to be considered when using this approach:

-   Shouldn't not put any sensitive data in here as it is visible to everyone and you can't ignore _package.json_ in the _.gitignore_.
-   Don't put more than 2 variables as it could quickly becomes a mess.
-   Separating variables for development and production environment can be very hard.

## 2. Different keys files

This approach is completely different from first approach and addresses some of the issue of first approach.

Instead of using _package.json_, we can use **keys.dev.js** for development and **keys.prod.js** for production environment. Each file stores different variables for different environment.

---

**_Make sure to ignore keys.dev.js in the .gitignore before commiting any changes._**

---

But how we can use them?

Using them can be tricky (when i initially got frustrated), So pay attention. Both files are exported by a third file i.e **keys.js** which checks the Node.js execution environement i.e. `NODE_ENV` and exports the correct keys file.

But how can I check Node.js environment before running our code? Look at the [first approch](#using-package-json) for a brief. Below is an example for this approach:

```javascript
// keys.dev.js ==========
module.exports = {
    PORT: 5000,
};

// keys.prod.js ==========
module.exports = {
    PORT: process.env.PORT,
};

// keys.js ==========
const devKeys = require("keys.dev.js");
const prodKeys = require("keys.prod.js");

if (process.env.NODE_ENV === "production") {
    module.exports = prodKeys;
} else {
    module.exports = devKeys;
}
```

This approach addresses all the issues of the first approach.

-   Multiple variables can be easily managed.
-   Development and production both have their own keys.
-   Development keys i.e. **keys.dev.js** can be ignored in the _.gitignore_ keeping secrets away from others.

But no one wants to maintain extra code/file (including me). There must be a better way to do this!

## 3. `.env` comes to the rescue

.env is a special file which is used to define environment variables in Node.js. It holds `key=value` pairs to define the variables.

---

**_Make sure to ignore .env in the .gitignore before commiting any changes._**

---

But, Node.js doesn't know how to read and parse this file. How do we do that? Either you could write your own logic to read and parse the file or Use a third party module to do the heavy lifting.

One popular module is [dotenv](https://github.com/motdotla/dotenv) (which i use) which can guide through the basic of .env file.

#### ~ Creating the file

First create a file with name .env in the _root of the project_ which contains all variable which will be injected in the environment by the dotenv.

```bash
# .env ======
PORT=5000
WHO_AM_I="Who Knows"
```

#### ~ Configuring the dotenv

First intall the dotenv package from the npm as a dev dependencies as we don't need this in production.

```bash
npm i -D dotenv
```

There are several methods to load dotenv package. But, I will show you the method that i like.

To load the dotenv package and correctly read the .env file you have to modify the scripts in the package.json. Like below

```json
{
    ...
    "scripts": {
        "start": "node bin/www.js",
        "dev": "node -r dotenv/config bin/www.js"
        // For nodemon users ====
        // "dev": "nodemon -r dotenv/config bin/www.js"
    }
    ...
}
```

As you can see there are two scripts

-   **start** for the production
-   **dev** for the development which loads the dotenv module

This will make sure that we don't accidentally load the dotenv in production.

#### ~ Run the code

Now you can run the server but typing the following command.

```bash
npm run dev
```

And BOOM! You can now use all the variables defined in the .env file by the following syntax.

```javascript
process.env.YOUR_VARIABLE_NAME;
```

So What kind of magic is this? What is going on? In the dev script we are telling node to preload a module by passing `-r <module_name>` flag. By requiring dotenv/config which read and parse the .env and sets the variable in the environment and provide access to those variable before running our code.

Now, we have a single place to define all the environment variables.

To make life a little easier, you can make a separate file i.e **keys.js** which exports all those variable like so we do in the second approach. This helps us to organize all the variables we use in our code.

**NOTE:** If you add variables in the .env then also update your exports in **keys.js** file.

```javascript
// keys.js ======
module.exports = {
    PORT: process.env.PORT,
    WHO_AM_I: process.env.WHO_AM_I,
};
```

<br />

### Points to be considered

-   Always ignore your development keys in the _.gitignore_.
-   Don't mess with `NODE_ENV` variable. Values other than **development** or **production** can break your app.
-   Always restart your app after changing environment variables.
