import { Router } from "express";
import { SpecialityRoutes } from "../modules/specialities/specialities.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();
router.use("/auth", AuthRoutes)
router.use("/specialties", SpecialityRoutes)


export const IndexRoutes = router;