import express from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { doctorController } from './doctor.controller';

const router = express.Router();

// Get all doctors - accessible by ADMIN, SUPER_ADMIN, and DOCTOR
router.get(
  "/",
//   checkAuth("ADMIN", "SUPER_ADMIN", "DOCTOR"),
 doctorController.GetAllDoctor,
);

export const doctorRoutes = router;