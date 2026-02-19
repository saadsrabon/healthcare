import { Role, UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

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
    throw new Error('Failed to register Patient')
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
     throw new Error('Failed to create patient profile')
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
    throw new Error('Failed to login')
 }
 if(data.user.status === UserStatus.BLOCKED){
    throw new Error('User is blocked')
 }
 if(data.user.status === UserStatus.DELETED){
    throw new Error('User is deleted')
 }


 return data
}

export const authService = {
    registerPatient,
    loginUser
}