import { get } from "node:http"
import { prisma } from "../../lib/prisma"
// model Speciality{
//  id String @id @default(uuid(7))
//     title       String  @unique @db.VarChar(100)
//     description String? @db.Text
//     icon        String? @db.VarChar(255)

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     isDeleted         Boolean           @default(false)
//     deletedAt         DateTime?
//     doctorSpecialties DoctorSpecialty[]

//     @@index([isDeleted], name: "idx_speciality_isDeleted")
//     @@index([title], name: "idx_speciality_title")
//     @@map("specialities")
// }




// model DoctorSpecialty {
//     id          String @id @default(uuid(7))
//     doctorId    String
//     specialtyId String

//     doctor    Doctor    @relation(fields: [doctorId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//     speciality Speciality @relation(fields: [specialtyId], references: [id], onDelete: Cascade, onUpdate: Cascade)

//     @@unique([doctorId, specialtyId])
//     @@index([doctorId], name: "idx_doctor_speciality_doctorId")
//     @@index([specialtyId], name: "idx_doctor_speciality_specialityId")
//     @@map("doctor_specialties")
// }
const GetAllDoctor = async () => {
    const result = await prisma.doctor.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            registrationNumber: true,
            experience: true,
            gender: true,
            appointmentFee: true,
            qualification: true,
            currentWorkingPlace: true,
            designation: true,
            averageRating: true,
            createdAt: true,
            updatedAt: true,
            specialties: {
                select:{
                    speciality:{
                        select:{
                            id:true,
                            title:true
                        }
                    }
                }
            }
        }

    })

    const doctors = result.map(d=>{
        return {
            ...d,
            specialties:d.specialties.map(s=>s.speciality)
        }
    })

    return doctors
}

const getDoctorById = async (id:string) => {
  const result  = await prisma.doctor.findUnique({
      where:{
          id:id,
          isDeleted:false
      },
      include:{
          specialties:{
            include:{speciality:true}
          }
      }
  })

  if(!result){
      throw new Error('Doctor not found')
  }

  return result
}

    
export const doctorService ={
    GetAllDoctor,
    getDoctorById,
}