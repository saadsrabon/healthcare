import { Router } from "express";
import { SpecialityRoutes } from "../modules/specialities/specialities.routes";

const router = Router();

router.use("/specialties", SpecialityRoutes)


export const IndexRoutes = router;