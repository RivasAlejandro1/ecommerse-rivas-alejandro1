import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


/* @Injectable()
export class loggerMiddleware implements NestMiddleware{
    use( req:Request, res: Response, next: NextFunction){
        const date = new Date()
        console.log( `
        ${req.url} 
        ${req.method} 
        ${date.getDate}/${date.getMonth}/${date.getFullYear}
        ${date.getHours}/${date.getMinutes}/${date.getSeconds} 
        `)

        next()
    }
} */

export function loggerMiddleware(req:Request, res: Response, next: NextFunction){
    const date = new Date()
    console.log( `
    Path: ${req.originalUrl} 
    Method: ${req.method} 
    Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
    Hour: ${date.getHours()}H : ${date.getMinutes()}Min : ${date.getSeconds()} Sec 
    `)
    next()
}