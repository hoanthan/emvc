import { RequestHandler } from "express";

export interface HTTPActionOptions {
    path: string;
    middlewares?: RequestHandler[];
    nextFunctions?: RequestHandler[]
}

export interface RouteDefinition {
    path: string
    requestMethod: 'get' | 'post' | 'delete' | 'patch' | 'put'
    methodName: string
    middlewares?: RequestHandler[];
    nextFunctions?: RequestHandler[];
}