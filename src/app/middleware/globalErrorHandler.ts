import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/config"

export const globalerrorHandler =(err:any,req: Request, res: Response ,next:NextFunction) => {
    if(envVars.NODE_ENV === 'DEVELOPMENT') console.log(err)
    let statusCode = err.statusCode || 500
    let message:string = err.message || 'Something went wrong'
        res.status(statusCode).json({
        success:false,
        message: message,
        error: err
    })
}