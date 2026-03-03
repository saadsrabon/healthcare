import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { verify, decode } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { success } from 'zod';
import { th } from 'zod/locales';

const createToken = (payload: JwtPayload, secret: string, {expiresIn}:SignOptions) => {
    return jwt.sign(payload, secret, {expiresIn})
}
const verifyToken = (token: string, secret: string) => {
    try {
        const decoded =jwt.verify(token, secret) as JwtPayload
        return {
            success:true,
            data:decoded
         }
        
    } catch (error) {
        return {
            success:false,
            error:'Invalid token'
        }
    }
}

const decodeToken = (token: string) => {
    try {
        const decoded = jwt.decode(token) as JwtPayload
        return {
            success:true,
            data:decoded
         }
        
    } catch (error) {
        return {
            success:false,
            error:'Failed to decode token'
        }    }
    }

export {
    createToken,
    verifyToken,
    decodeToken
}