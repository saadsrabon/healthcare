///create specilities-

import { prisma } from "../../lib/prisma";

const createSpeciality = async (data: any) => {
    const result = await prisma.speciality.create({
        data,
    });
    return result;
};

export const SpecialityService = {
    createSpeciality,
};