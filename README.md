[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Malaka98/food-ordering-system/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Malaka98/food-ordering-system/tree/main)

[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/Malaka98/food-ordering-system/main/build_and_deploy/badge.svg?window=90d)](https://app.circleci.com/insights/github/Malaka98/food-ordering-system/workflows/build_and_deploy/overview?branch=main&reporting-window=last-90-days&insights-snapshot=true)

# **Full Stack Project Backend**

### This web service has been developed using Express

Also, the "Inversion Of Control" principle, which is a very useful design principle, has been used here.

**This is a response from ChatGPT**

Inversion of Control (IoC) is a design principle that allows a component to receive its dependencies, rather than
creating them itself. This separates the concerns of creating and managing dependencies from the component that uses
them, and allows for greater flexibility and testability.

There are two main types of IoC:

    Dependency Injection (DI): This is the process of providing an object with its dependencies. 
                               The object doesn't create or look up its dependencies, but instead they are passed to it.

    Service Locator: An object that "locates" or retrieves other objects, 
                     often used to decouple a class from the process of creating its dependencies.

Inversify is a popular library for implementing IoC in JavaScript and TypeScript projects, it uses a modular approach to
build a lightweight and powerful inversion of control container for JavaScript & Node.js applications.

Inversion of control is often used in software development to increase flexibility and testability of the code. By using
IoC, it is possible to change the behavior of a component by replacing its dependencies without modifying the component
itself. This makes it easier to test components in isolation and to change the implementation of a component without
affecting the rest of the system.

**The inversify library has been used to implement an IOC container on a node express server**

## Installation

Full Stack Project Backend system requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd Full Stack Project Backend
npm install
```

Add the following environment variables in the .env file:

```sh
  MONGO_USER=<MongoDb Username>
  MONGO_PASSWORD=<MongoDb Password>
  MONGO_PATH=cluster0.6pjjs4p.mongodb.net/<atless db name>?retryWrites=true&w=majority
  PORT=<PORT Number>
  JWT_SECRET=<my-secret>
  ORIGIN_URL=<http://localhost:4200>
```

To run the application in the development environment:

```sh
npm dev
```

To run ESLint code analysis:

```sh
npm lint
```

To run the test cases:

```sh
npm test
```

To build the application:

```sh
npm build
```

To run the built application:

```sh
npm start
```

## Docker

Full Stack Project Backend is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd Full Stack Project Backend
sudo docker build -t my-app .
sudo docker run -p 4000:4000 my-app
```
## API documentation

**BASE_URL/api/user [Method: POST]**

*Add User (sample request)*
```http request
    http://localhost:4000/api/user
```
```json
    {
        "firstName": "Malaka",
        "lastName": "Jayakodi",
        "username": "rootx",
        "email": "rootx.6506@gmail.com",
        "address": "Kuliyapitiya",
        "password": "123456",
        "phoneNumber": "07771234567"
    }
```

**BASE_URL/api/user/login [Method: POST]**

*Login (sample request)*
```http request
    http://localhost:4000/api/user/login
```
```json
    {
        "username": "rootx",
        "password": "123456"
    }
```

**BASE_URL/api/user [Method: GET]**

*Check user is logged (sample request)*
```http request
   http://localhost:4000/api/user
```

**BASE_URL/api/user/:userId [Method: GET]**

*Get User By Id (sample request)*
```http request
   http://localhost:4000/api/user/63e0a78a8b31416179ac08d0
```

**BASE_URL/api/user/:email [Method: DELETE]**

*Delete user by email (sample request)*
```http request
  http://localhost:4000/api/user/jayakodi@gmail.com
```
