
import { speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createspeciality = async (payload: speciality): Promise<speciality> => {

    const speciality = await prisma.speciality.create({
        data: payload
    })

    return speciality;

}

const getAllSpecialties = async (): Promise<speciality[]> => {

    const specialties = await prisma.speciality.findMany();
    return specialties;
}

const deletespeciality = async (id: string): Promise<speciality> => {

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