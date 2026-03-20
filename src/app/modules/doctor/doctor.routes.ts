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

// Get a specific doctor by ID - accessible by ADMIN, SUPER_ADMIN, and DOCTOR
router.get(
  "/:id",
//   checkAuth("ADMIN", "SUPER_ADMIN", "DOCTOR"),
  doctorController.getDoctorById,
);

export const doctorRoutes = router;