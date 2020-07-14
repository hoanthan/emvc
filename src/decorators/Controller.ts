import { TargetType } from "."

export const Controller = (prefix: string = '') => {
    return (target: any) => {
        // define the prefix url to the controller
        Reflect.defineMetadata('prefix', prefix, target)
        // define the class as a controller
        Reflect.defineMetadata('targetType', TargetType.Controller, target)
        // check if controller has any routes
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target)
        }
    }
}