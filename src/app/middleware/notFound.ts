
import { Response, Request, NextFunction } from "express";

const notFound = (req:Request, res:Response, next:NextFunction) => {
   res.status(404).send('Route not found')
   res.json({
    success: false,
    message: 'Route not found'})
};

export default notFound;