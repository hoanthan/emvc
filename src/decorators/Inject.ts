import { DI } from "../DI"

export const Inject = (dependency: Function): PropertyDecorator => {
    return (target, propertyKey) => {
        const dependencyInstance = DI.getDependency(dependency)
        Object.defineProperty(target, propertyKey, {
            get: () => dependencyInstance
        })
    }
}