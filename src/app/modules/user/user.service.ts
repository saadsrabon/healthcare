// create doctor

import { Role, speciality } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./userInterface";

const createDoctor =async (payload:ICreateDoctorPayload) => {
    //extract  doctor and specialties from payload
    const sepecialties:speciality[] =[];

    for(const specialityId of payload.specialties){
        const speciality = await prisma.speciality.findUnique({
            where:{
                id:specialityId
            }
        })
         if(!speciality){
            throw new Error(`Speciality with id ${specialityId} not found`)
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
        throw new Error('User with this email already exists')
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