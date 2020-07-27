import { getAllServicePaths } from "../common/paths";
import { MetadataNames, TargetType } from "../decorators";

const registerService = (module: { [x: string]: any }) => {
    Object.keys(module).forEach(key => {
        let exportMember = module[key]
        if (Reflect.getMetadata(MetadataNames.TargetType, exportMember) === TargetType.Service) {
            console.log('Service: ', exportMember.name);
        }
    })
}

export const registerServices = async () => {
    const allServicePaths = await getAllServicePaths();
    const promises: Promise<void>[] = [];

    allServicePaths.forEach(path => {
        promises.push(import(path).then(registerService))
    })
}