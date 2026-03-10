// create doctor

import { Role, Speciality } from "../../../generated/prisma/client";
import AppError from "../../errorhelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./userInterface";

const createDoctor =async (payload:ICreateDoctorPayload) => {
    //extract  doctor and specialties from payload
    const sepecialties:Speciality[] =[];

    for(const specialityId of payload.specialties){
        const speciality = await prisma.speciality.findUnique({
            where:{
                id:specialityId
            }
        })
         if(!speciality){
            throw new AppError(404, `Speciality with id ${specialityId} not found`);
         }
         sepecialties.push(speciality)
    }
    //check if user with email already exists
    const existingUser = await prisma.user.findUnique({
        where:{
            email:payload.doctor.email
        }
    })
    if(existingUser){
        throw new AppError(400, 'User with this email already exists');
    }
    // first we need to create user and then doctor
    const userData = await auth.api.signUpEmail({
        body:{
            email:payload.doctor.email,
            password:payload.password,
            name:payload.doctor.name,
            role:Role.DOCTOR,
            needPasswordChange:true
        }
    })
     // now the actual transaction -- Create doctor then add specialties and finally search doctor and return it all will be in try catch block
       try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,
                }
            })

            const doctorSpecialtyData = sepecialties.map((specialty) => {
                return {
                    doctorId: doctorData.id,
                    specialtyId: specialty.id,
                }
            })

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialties: {
                        select: {
                            speciality: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor;

        })

        return result;
    } catch (error) {
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error;
    }
}

const createAdmin = async (payload:any) => {
    // first check if any user with the email already exist kore ki na
    const existingUser = await prisma.user.findUnique({
        where:{
            email:payload.admin.email
        }
    })
    if(existingUser){
        throw new AppError(400, 'User with this email already exists');
    }
    // first we need to create user and then admin
    const userData = await auth.api.signUpEmail({
        body:{
            email:payload.admin.email,
            password:payload.password,
            name:payload.admin.name,
            role:Role.ADMIN,
            needPasswordChange:true
        }
    })
    // Transaction to create admin profile and if error then delete the user itself
    try{
        const result = await prisma.$transaction(async(tx)=>{
            const admin = await tx.admin.create({
                data:{
                    userId:userData.user.id,
                    name:payload.admin.name,
                    email:payload.admin.email,
                    contactNumber:payload.admin.contactNumber,
                    profilePhoto:payload.admin.profilePhoto,
                }
            })
          
      // Fetch created admin with user data
      const createdAdmin = await tx.admin.findUnique({
        where: { id: admin.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });

      return createdAdmin;
        })

        return result
    }
    catch(error){
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw new AppError(400, 'Failed to create admin');
    }
}
const createSuperAdmin = async (payload:any) => {
    // first check if any user with the email already exist kore ki na
    const existingUser = await prisma.user.findUnique({
        where:{
            email:payload.admin.email
        }
    })
    if(existingUser){
        throw new AppError(400, 'User with this email already exists');
    }
    // first we need to create user and then admin
    const userData = await auth.api.signUpEmail({
        body:{
            email:payload.admin.email,
            password:payload.password,
            name:payload.admin.name,
            role:Role.ADMIN,
            needPasswordChange:true
        }
    })
    // Transaction to create admin profile and if error then delete the user itself
    try{
        const result = await prisma.$transaction(async(tx)=>{
            const admin = await tx.admin.create({
                data:{
                    userId:userData.user.id,
                    name:payload.admin.name,
                    email:payload.admin.email,
                    contactNumber:payload.admin.contactNumber,
                    profilePhoto:payload.admin.profilePhoto,
                }
            })
          
      // Fetch created admin with user data
      const createdAdmin = await tx.admin.findUnique({
        where: { id: admin.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });

      return createdAdmin;
        })

        return result
    }
    catch(error){
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw new AppError(400, 'Failed to create admin');
    }
}


export const UserService = {
    createDoctor,
    createAdmin,
}