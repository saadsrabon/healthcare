import express from 'express';
import { UserController } from './user.controller';
import z from 'zod';
const router = express.Router();


// zod validation for create doctor
const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6,"Password must be at least 6 characters long"),
    doctor: z.object({
        name: z.string("Name is required").min(3,"Name must be at least 3 characters long"),
        email: z.email("Invalid email"),
        profilePhoto: z.string("").optional(),
        contactNumber: z.string().optional(),
        address: z.string().optional(),
        registrationNumber: z.string(),
        experience: z.number().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        appointmentFee: z.number(),
        qualification: z.string(),
        currentWorkingPlace: z.string(),
        designation: z.string(),
    }),
    specialties: z.array(z.string()),
})

router.post('/create-doctor',(req,res,next) =>{
   
    const {error,success,data} = createDoctorZodSchema.safeParse(req.body);
    if(!success){
      next(error)
    }
    req.body = data;

    next()
}, UserController.createDoctor);

// later we will add the check auth middleware
router.post('/create-admin', UserController.createAdmin);
router.post('/create-super-admin', UserController.createSuperAdmin);
export const UserRoutes = router;