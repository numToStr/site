---
title: Running React and Node.js in one shot with Docker!
date: 2019-07-23
tags: ["node", "nodejs", "npm", "docker", "react", "reactjs", "workflow"]
type: post
---

This is the second part of my previous post. If you haven't read my first post, please check it out as it serves as a base for this part.

-   [Connecting & Running with Concurrently](/blog/running-react-node-concurrently) (first post)
-   Using Docker (this post)

> #### TL;DR - If you don't know docker you can just turn back. But, If you still want to read go ahead.

In this post we'll be looking at the docker way of running React and Node.js. This is a kind of advance development setup and I hope you already [installed](https://docs.docker.com/install/) and know the basics of [docker](https://docs.docker.com/engine/docker-overview/) and [docker-compose](https://docs.docker.com/compose/). If you want to know more about docker head over to [docker.com](https://docker.com)

## # Initial setup

```bash
$ mkdir awesome_project
```

In this approach we'll not polluting the root folder. Client and Server will stay on their dedicated folder. In this way we can separate client and server at any time if we have to, without breaking anything. To make it work properly, each of them should have a [Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) and all will be connected with the docker-compose.

## # Client Setup (React)

#### ~ Create react app

```bash
$ cd awesome_project && npx create-react-app client
```

This will create a folder named _client_ which holds our react app.

#### ~ Dockerfile for React

Create a file name `Dockerfile` in the **_client_** folder and paste the following code.

```docker
FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
```

This will be our docker image instructions for our react app where our react app will get compiled and run.

## # Server Setup (Node.js)

Our server code will stay in a folder named `server` in the root folder. Here you can use express or any other framework of your choice to make up the server. Or you can use [this sample](https://gist.github.com/vkasraj/d0de199f77834f86c5971c81716ac70b) to quickly setup a server.

#### ~ Dockerfile for Node Server

Create a `Dockerfile` in the **_server_** folder. And make sure you have a `dev` script in you `package.json`. If you have different script for running your server, you can change the `CMD` instruction in the `Dockerfile` below.

```docker
FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE 5000

# You can change this
CMD [ "npm", "run", "dev" ]
```

## # Running with docker-compose

Docker-compose helps us to combine and run mutiple Dockerfile into a single network container. Make a file named `docker-compose.yml` in the **_root_** of the project and copy the following code.

```yaml
version: "3"
services:
    frontend:
        container_name: awesome_web
        build:
            context: ./client
            dockerfile: Dockerfile
        image: vikasraj/awesome_web
        ports:
            - "3000:3000"
        volumes:
            - ./client:/usr/src/app
    backend:
        container_name: awesome_server
        build:
            context: ./server
            dockerfile: Dockerfile
        image: vikasraj/awesome_server
        ports:
            - "5000:5000"
        volumes:
            - ./server:/usr/src/app
```

Finally, we'll have a folder structure somewhat like this.

```bash
> awesome_project
    > client # This is our react front-end
        > node_modules
        > src
        - Dockerfile
        - package.json
    > server # This is our Node.js server
        > node_modules
        - index.js
        - Dockerfile
        - package.json
    - docker-compose.yml
```

Now we can run our project by running following command. This will create docker images and [volumes](https://docs.docker.com/storage/volumes/) which will run in the containers.

```bash
$ docker-compose up
```

If you want to build your images before starting your containers.

```bash
$ docker-compose up --build
```

This can be a tedious approach to work with as you must have the knowledge of docker and docker-compose. But It has some advantage:

-   One setup for all development workflow.
-   Docker can be used for any programming language.
-   Production Deloyment can be a breeze, if you use docker in your DevOps.
-   No npm package required (though replaced by docker).
