import { Container } from "inversify";
import { MetadataNames } from "../decorators";

declare type ObjectType<T> = {
  new (...args: any[]): T;
};

const rootContainer = new Container();

export const Containers: {
  [name: string]: Container;
} = {
  root: rootContainer,
};

export const createContainer = (name: string) => {
  Containers[name] = new Container();
  return Containers[name];
};

export const getService = <T>(type: ObjectType<T>): T => {
  const providedIn = Reflect.getMetadata(MetadataNames.ServiceProvidedIn, type);
  const serviceSymbol = Reflect.getMetadata(MetadataNames.ServiceSymbol, type);
  const container = Containers[providedIn];
  const service = container.get<T>(serviceSymbol);
  return service;
};
