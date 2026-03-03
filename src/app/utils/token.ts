import { JwtPayload, SignOptions } from "jsonwebtoken"
import { createToken } from "./jwt"
import { envVars } from "../config/config"

const getAccessToken = (payload:JwtPayload) => {
    const accessToken = createToken(payload,envVars.JWT_ACCESS_SECRET,{expiresIn:envVars.JWT_ACCESS_EXPIRES_IN} as SignOptions);
    return accessToken;
}

const getRefreshToken = (payload:JwtPayload) => {
    const refreshToken = createToken(payload,envVars.JWT_REFRESH_SECRET,{expiresIn:envVars.JWT_REFRESH_EXPIRES_IN} as SignOptions);
    return refreshToken;
}

export {
    getAccessToken,
    getRefreshToken
}