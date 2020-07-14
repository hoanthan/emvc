export class DI {
    private static _injectables = []

    static get injectables() {
        return this._injectables
    }

    static push(injectables: any | any[]) {
        if (Array.isArray(injectables)) {
            DI._injectables.push(...injectables)
        }
        else DI._injectables.push(injectables)
    }

    static getDependency(DependencyType: Function) {
        let dependencyInstance = this._injectables.find(injectable => injectable instanceof DependencyType)
        return dependencyInstance
    }
}