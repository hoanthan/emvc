import { RequestHandler } from "express";

export interface HTTPActionOptions {
    path: string
    middlewares?: RequestHandler[]
}

export interface RouteDefinition {
    path: string
    requestMethod: 'get' | 'post' | 'delete' | 'patch' | 'put'
    methodName: string
    middlewares?: RequestHandler[]
}