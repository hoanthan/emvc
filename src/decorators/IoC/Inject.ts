import { Containers } from "../../containers";
import { MetadataNames } from "../interfaces";

export const Inject: () => PropertyDecorator = () => (target: any, propertyName: string | symbol) => {
    const type = Reflect.getMetadata('design:type', target, propertyName);
    const providedIn = Reflect.getMetadata(MetadataNames.ServiceProvidedIn, type);
    const serviceSymbol = Reflect.getMetadata(MetadataNames.ServiceSymbol, type);
    if(!providedIn || !serviceSymbol) return;
    const container = Containers[providedIn];
    if(!container) return;
    const service = container.get(serviceSymbol);
    target[propertyName] = service;
}