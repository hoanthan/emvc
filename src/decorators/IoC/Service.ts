import { decorate, injectable } from 'inversify';
import { Containers, createContainer } from '../../containers';
import { MetadataNames, ServiceDecoratorParams, TargetType } from "../interfaces";

const createServiceSymbol = (containerName: string, name: string) => {
    return Symbol.for(`_service.${containerName}.${name}`);
}

export function Service<Interface = any>({
    provideIn = 'root'
}: ServiceDecoratorParams = {
        provideIn: 'root'
    }): ClassDecorator {
    return (target: any) => {
        decorate(injectable(), target);
        Reflect.defineMetadata(MetadataNames.TargetType, TargetType.Service, target);
        Reflect.defineMetadata(MetadataNames.ServiceProvidedIn, provideIn, target);
        let container = Containers[provideIn];
        if (!container) {
            container = createContainer(provideIn);
        }
        const ServiceType = createServiceSymbol(provideIn, target.name);
        Reflect.defineMetadata(MetadataNames.ServiceSymbol, ServiceType, target);
        container.bind<Interface>(ServiceType).to(target);
    }
}