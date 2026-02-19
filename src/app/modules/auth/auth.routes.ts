import { Router } from "express";
import { AuthController } from "./auth.controller";

const router =Router();

// router.post('/login', authController.login);
router.post('/register', AuthController.registerPatient);
router.post('/login', AuthController.loginUser);

export const AuthRoutes = router