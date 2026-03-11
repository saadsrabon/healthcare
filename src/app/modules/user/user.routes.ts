import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();



router.post('/create-doctor',(req,res,next) =>{
   
    const {error,success,data} = UserValidation.createDoctorZodSchema.safeParse(req.body);
    if(!success){
      next(error)
    }
    req.body = data;

    next()
}, UserController.createDoctor);

// later we will add the check auth middleware
router.post('/create-admin',(req,res,next) =>{
   
    const {error,success,data} = UserValidation.createAdminValidationSchema.safeParse(req.body);
    if(!success){
      next(error)
    }
    req.body = data;

    next()
}, UserController.createAdmin);
router.post('/create-super-admin',(req,res,next) =>{
   
    const {error,success,data} = UserValidation.createSuAdminValidationSchema.safeParse(req.body);
    if(!success){
      next(error)
    }
    req.body = data;

    next()
}, UserController.createSuperAdmin);
export const UserRoutes = router;