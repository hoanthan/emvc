import { MetadataNames } from "..";
import { Containers } from "../containers";

export const inject = <ServiceType = any>(target: any): ServiceType | null => {
    const providedIn = Reflect.getMetadata(MetadataNames.ServiceProvidedIn, target);
    const serviceSymbol = Reflect.getMetadata(MetadataNames.ServiceSymbol, target);
    if (!providedIn || !serviceSymbol) return null;
    const container = Containers[providedIn];
    if (!container) return null;
    const service: ServiceType = container.get(serviceSymbol);
    return service || null;
}