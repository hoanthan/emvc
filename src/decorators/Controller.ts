import { MetadataNames, TargetType } from "./interfaces"

export const Controller = (prefix: string = '') => {
    return (target: any) => {
        // define the prefix url to the controller
        Reflect.defineMetadata(MetadataNames.Prefix, prefix, target)
        // define the class as a controller
        Reflect.defineMetadata(MetadataNames.TargetType, TargetType.Controller, target)
        // check if controller has any routes
        if (!Reflect.hasMetadata(MetadataNames.Routes, target)) {
            Reflect.defineMetadata(MetadataNames.Routes, [], target)
        }
    }
}