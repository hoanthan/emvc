# EMVC - Decorators

`emvc-decorators` is a set of Typescript Decorators which supports defining controllers, actions, services and injecting services in a Node.js - Express application

## Installation

```bash
npm install --save emvc-decorators
# or using yarn
yarn add emvc-decorators
```

## Creating a controller

Let's create our first controller - User Controller, in this example, I will create it under `src/controllers` folder.

```bash
touch ./src/controllers/user.controller.ts
```

Inside the `user.controller.ts` file, let's create and export a class named `UserController`

```ts
export class UserController {}
```

In other to register this controller, we will need to define it as `Controller` using `@Controller` decorator. You can also define the root path to call the API actions in this controller as below

```ts
import { Controller } from "emvc-decorators";

@Controller("/users")
export class UserController {}
```

## Defining actions

Inside the `UserController`, let's define an action that get all users and respond to client. To define a route to this action, we will need to use `HTTP Action decorators`, which are `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`.

```ts
import { Controller, Get } from "emvc-decorators";
import { NextFunction, Request, Response } from "express";

@Controller("/users")
export class UserController {
  @Get({
    path: "/",
  })
  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = [
        {
          id: 1,
          name: "Hoan Than",
        },
        {
          id: 2,
          name: "Thai Tang",
        },
      ]; // [TODO]: Get real data from database

      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
```

## Configuring Express server

Feel free to initialize the Express application as usual. Then, you will need to set the glob pattern for the library to find the controllers, for example, `./controllers/**/*.controller.js` as below:

```ts
import EMVC from "emvc-decorators";
import express from "express";
import path from "path";

EMVC.config({
  controllers: path.resolve(__dirname, "./controllers/**/*.controller.js"),
});

const startServer = async () => {
  app.listen(3000, () => {
    console.log("Express server is up");
  });
};

startServer();
```

- Important: You will need to change the pattern to `*.js` instead of `*.ts`, because your application will be compiled into JS files in build time.

Now, let's configure the API routes. EMVC provides `createRoutes` function which returns a `Router` object to be used by Express application.

```ts
import EMVC, { createRoutes } from "emvc-decorators";
import express from "express";
import path from "path";

EMVC.config({
  controllers: path.resolve(__dirname, "./controllers/**/*.controller.js"),
});

const app = express();

const startServer = async () => {
  app.use(await createRoutes()); // using registered routes from controllers and actions

  app.listen(3000, () => {
    console.log("Express server is up");
  });
};

startServer();
```

That's it! Try running your application, if you call `[GET] http://localhost:3000/users`, a list of users will be responded

## Decorators

### Controller Registrator

#### @Controller

- Defines a controller (as the `M` in `MVC` model) with a root path to access its actions. This root path will be combined with actions' route to define their full routes. For example, User Controller with `/users` as its root path, it has `getAll` method which lists all users. This action is registered with `@Get({ path: '/' })`. When you run the application, the list all users API will be served at `{domain}/users`.

Parameters
| Parameter | Required | Default |
| --------- | -------- | ------- |
| prefix | false | "" |

### HTTP Actions

#### @Get

- Defines a GET request handler

#### @Post

- Defines a POST request handler

#### @Patch

- Defines a PATCH request handler

#### @Put

- Defines a PUT request handler

#### @Delete

- Defines a DELETE request handler

Parameters

| Parameter | Required | Type              |
| --------- | -------- | ----------------- |
| options   | true     | HTTPActionOptions |

Types

- HTTPActionOptions:

| Property      | Required | Type                     | Default |
| ------------- | -------- | ------------------------ | ------- |
| path          | true     | string                   | -       |
| middlewares   | false    | Express.RequestHandler[] | []      |
| nextFunctions | false    | Express.RequestHandler[] | []      |

### Inversion of Control (IoC)

`emvc-decorators` uses [inversify](https://inversify.io/) as IoC container, in case you want to use this pattern

#### Registering Service

`emvc-decorators` provides `@Service` class decorator to define a `service`

Parameters:

- options: ServiceDecoratorParams

Types:

- ServiceDecoratorParams
  | Property | Type | Required | Default | Description |
  | -------- | ------ | -------- | ------- | ----------- |
  |provideIn | string | false | 'root' | Name of container that contains this service, default to 'root' |

Example:

```ts
@Service()
export default class UserService {
  getAllUsers() {
    return [
      {
        id: 1,
        name: "Hoan Than",
      },
      {
        id: 2,
        name: "Thai Tang",
      },
    ];
  }
}
```

#### Injecting service

You can inject a service by using `@Inject` property decorator

Example usage:

```ts
@Controller("/users")
export class UserController {
  @Inject()
  private _userService: UserService;

  @Get({
    path: "/",
  })
  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = this._userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
```
