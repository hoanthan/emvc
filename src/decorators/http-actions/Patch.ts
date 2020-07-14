import { RouteDefinition, HTTPActionOptions } from "../http-actions"

export const Patch = (options: HTTPActionOptions): MethodDecorator => {
    return (target, propertyKey: string | symbol): void => {
        // init routes metadata if not exist
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }
        // get routes metadata
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
        // push new route
        routes.push({
            requestMethod: 'patch',
            path: options.path,
            methodName: propertyKey as any,
            middlewares: options.middlewares
        })
        // update routes metadata
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}