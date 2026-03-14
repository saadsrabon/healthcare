import { Router } from "express";
import { SpecialityRoutes } from "../modules/specialities/specialities.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";
// import { doctorRoutes } from "../modules/doctor/doctor.routes";

const router = Router();
router.use("/auth", AuthRoutes)
router.use("/specialties", SpecialityRoutes)
router.use("/users", UserRoutes)
router.use("/doctors", doctorRoutes)


export const IndexRoutes = router;