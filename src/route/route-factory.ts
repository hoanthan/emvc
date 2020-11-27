import { Router as RouterFn } from "express";
import { Router } from "express-serve-static-core";
import { getAllControllerPaths } from "../common/paths";
import { MetadataNames, RouteDefinition, TargetType } from "../decorators";

const _controllers: any[] = [];

const configControllerRoutes = (
  router: Router,
  modulePath: string
) => (module: { [x: string]: any }) => {
  let Controller: any;
  let controllerPath = "";
  Object.keys(module).forEach((key) => {
    let exportMember = module[key];
    if (
      Reflect.getMetadata(MetadataNames.TargetType, exportMember) ===
      TargetType.Controller
    ) {
      Controller = exportMember;
      controllerPath = modulePath;
    }
  });
  if (!Controller) return;
  const instance = new Controller();
  const prefix = Reflect.getMetadata(MetadataNames.Prefix, Controller);
  const routes: Array<RouteDefinition> = Reflect.getMetadata(
    MetadataNames.Routes,
    Controller
  );

  routes.forEach((route) => {
    route.middlewares = route.middlewares || [];
    route.nextFunctions = route.nextFunctions || [];
    router[route.requestMethod](
      prefix + route.path,
      ...route.middlewares,
      instance[route.methodName].bind(instance),
      ...route.nextFunctions
    );
  });

  console.info(
    "Controller: ",
    Controller.name,
    "- Routes:",
    routes.map((route) => ({
      ...route,
      middlewares: route.middlewares?.map((middleware) => middleware.name),
    }))
  );

  _controllers.push({
    path: controllerPath,
    routes,
  });
};

export const createRoutes = async (router?: Router) => {
  if (!router) {
    router = RouterFn();
  }

  let allFilePaths = [];

  allFilePaths = await getAllControllerPaths();

  const promises: Promise<void>[] = [];

  allFilePaths.forEach((path) => {
    promises.push(import(path).then(configControllerRoutes(router!, path)));
  });

  await Promise.all(promises).catch(console.error);

  return router;
};
