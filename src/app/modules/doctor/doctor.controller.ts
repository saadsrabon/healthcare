import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";

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

export const doctorController ={
    GetAllDoctor,
}