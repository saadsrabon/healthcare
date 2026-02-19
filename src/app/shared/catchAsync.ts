
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        try {
            await fn(req, res, next);
        } catch (error: any) {
            next(error);
        }
    }
}

