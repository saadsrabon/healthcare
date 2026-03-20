import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";
import { get } from 'node:http';

const GetAllDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const result = await doctorService.GetAllDoctor();
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Doctors fetched successfully',
            data: result
        });
    }
)


const getDoctorById = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await doctorService.getDoctorById(id);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Doctor fetched successfully',
            data: result
        });
    }
)
export const doctorController ={
    GetAllDoctor,
    getDoctorById   
}