import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const registerPatient = catchAsync(async (req:Request, res:Response) => {
    console.log(req)
    const payload = req.body
    console.log(payload);
    const result = await authService.registerPatient(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: 'Patient registered successfully',
        data: result
    });
});

const loginUser =catchAsync(async(req:Request, res:Response) => {
    const payload = req.body
    console.log(payload);
    const result = await authService.loginUser(payload);
        const {accessToken, refreshToken, token , ...rest} = result;
        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: 'Patient logged in successfully',
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest
        }
    });
})

export const AuthController = {
    registerPatient,
    loginUser
}