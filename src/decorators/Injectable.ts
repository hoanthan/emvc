import { TargetType } from "."
import { DI } from "../DI"

export const Injectable = (): ClassDecorator => {
    return (Target: any) => {
        // define the class as a controller
        Reflect.defineMetadata('targetType', TargetType.Injectable, Target)
        const instance = new Target()
        DI.push(instance)
    }
}