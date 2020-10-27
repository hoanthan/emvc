import { getService } from "../../containers";

export const Inject: () => PropertyDecorator = () => (
  target: any,
  propertyName: string | symbol
) => {
  const type = Reflect.getMetadata("design:type", target, propertyName);
  const service = getService(type);
  target[propertyName] = service;
};
