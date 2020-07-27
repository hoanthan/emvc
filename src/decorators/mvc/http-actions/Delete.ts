import { MetadataNames } from "../../interfaces"
import { HTTPActionOptions, RouteDefinition } from "./interfaces"

export const Delete = (options: HTTPActionOptions): MethodDecorator => {
    return (target, propertyKey: string | symbol): void => {
        // init routes metadata if not exist
        if (!Reflect.hasMetadata(MetadataNames.Routes, target.constructor))
            Reflect.defineMetadata(MetadataNames.Routes, [], target.constructor)
        // get routes metadata
        const routes = Reflect.getMetadata(MetadataNames.Routes, target.constructor) as Array<RouteDefinition>
        // push new route
        routes.push({
            requestMethod: 'delete',
            path: options.path,
            methodName: propertyKey as any,
            middlewares: options.middlewares
        })
        // update routes metadata
        Reflect.defineMetadata(MetadataNames.Routes, routes, target.constructor)
    }
}