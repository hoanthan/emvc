import { Router } from "express-serve-static-core"
import { Router as RouterFn } from "express"
import { TargetType, RouteDefinition } from "../decorators"
import { getAllFilePaths } from "../common/paths"

const _controllers: any[] = []

export function getControllerPaths() {
    return _controllers
}

const configControllerRoutes = (router, modulePath) => module => {
    let Controller;
    let controllerPath = ''
    Object.keys(module).forEach(key => {
        let exportMember = module[key]
        if (Reflect.getMetadata('targetType', exportMember) === TargetType.Controller) {
            Controller = exportMember
            controllerPath = modulePath
        }
    })
    if (!Controller) return
    const instance = new Controller()
    const prefix = Reflect.getMetadata('prefix', Controller)
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Controller)

    routes.forEach(route => {
        route.middlewares = route.middlewares || []
        router[route.requestMethod](prefix + route.path, ...route.middlewares, instance[route.methodName].bind(instance))
    })

    _controllers.push({
        path: controllerPath,
        routes
    })
}

export const createRoutes = async (router?: Router) => {
    if (!router) {
        router = RouterFn()
    }

    let allFilePaths = []

    allFilePaths = await getAllFilePaths()

    const promises: Promise<void>[] = []

    allFilePaths.forEach(path => {
        promises.push(import(path).then(configControllerRoutes(router, path)))
    })

    await Promise.all(promises).catch(console.error)

    return router
}