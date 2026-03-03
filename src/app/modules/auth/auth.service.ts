
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import e from "express";
import { status } from 'http-status';
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorhelpers/AppError";


const registerPatient = async (payload:any ) => {
    const {name,email,password} =payload;

    const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password,

            role:Role.PATIENT
        }
    })
    
 if(!data.user){
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to register patient');
 }
  //create patient Profie in transaction after signup
 const patient = await prisma.$transaction(async(tx)=>{
 try{
     const patientTX =   await tx.patient.create({
         data:{
             userId:data.user.id,
             name:payload.name,
             email:payload.email
         }
     })

     return patientTX
 }
 catch(error){
    //manulay   delete user so that if anything happen on the user so it will be handled
     await prisma.user.delete({where:{id:data.user.id}})
     throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to create patient profile');
 }
 })

return {
    ...data,
    patient
}
}
interface loginPayload{
    email:string,
    password:string
}
const loginUser = async (payload:loginPayload) => {
 const {email,password} =payload

 const data = await auth.api.signInEmail({
    body:{
        email,
        password
    }
 })

 if(!data.user){
    throw new AppError(status.UNAUTHORIZED, 'Invalid email or password');
 }
 if(data.user.status === UserStatus.BLOCKED){
    throw new AppError(status.UNAUTHORIZED, 'User is blocked');
 }
 if(data.user.status === UserStatus.DELETED){
    throw new AppError(status.UNAUTHORIZED, 'User is deleted');
 }
 //   
 const accessToken = tokenUtils.getAccessToken({
    userId:data.user.id,
    role:data.user.role,
    emailVerified:data.user.emailVerified,
    name:data.user.name,
    email:data.user.email,
    status:data.user.status,
    isDeleted:data.user.isDeleted
})

const refreshToken = tokenUtils.getRefreshToken({
    userId:data.user.id,
    role:data.user.role,
    emailVerified:data.user.emailVerified,
    name:data.user.name,
    email:data.user.email,
    status:data.user.status,
    isDeleted:data.user.isDeleted
})
 return {
    ...data,
    accessToken,
    refreshToken
 }
}

export const authService = {
    registerPatient,
    loginUser
}