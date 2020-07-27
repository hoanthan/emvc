export enum TargetType {
    Controller = 'CONTROLLER',
    Service = 'SERVICE'
}

export interface ServiceDecoratorParams {
    provideIn?: string
}

export enum MetadataNames {
    TargetType = 'targetType',
    Prefix = 'prefix',
    Routes = 'routes',
    ServiceProvidedIn = 'serviceProvidedIn',
    ServiceSymbol = 'serviceSymbol',
}