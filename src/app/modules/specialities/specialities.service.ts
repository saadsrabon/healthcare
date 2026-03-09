
import { Speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createspeciality = async (payload: Speciality): Promise<Speciality> => {

    const speciality = await prisma.speciality.create({
        data: payload
    })

    return speciality;

}

const getAllSpecialties = async (): Promise<Speciality[]> => {

    const specialties = await prisma.speciality.findMany();
    return specialties;
}

const deletespeciality = async (id: string): Promise<Speciality> => {

    const speciality = await prisma.speciality.delete({
        where: { id }
    })

    return speciality;
}


export const specialityService = {
    createspeciality,
    getAllSpecialties,
    deletespeciality
}