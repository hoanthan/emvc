import { Container } from 'inversify';

const rootContainer = new Container();

export const Containers: {
    [name: string]: Container
} = {
    'root': rootContainer
}

export const createContainer = (name: string) => {
    Containers[name] = new Container();
    return Containers[name];
}