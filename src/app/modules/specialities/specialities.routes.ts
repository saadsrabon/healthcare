import express from "express";
const router  = express.Router();

import { SpecialtyController } from "./specialities.controller";

router.post('/', SpecialtyController.createSpecialty);
router.get('/', SpecialtyController.getAllSpecialties);
router.delete('/:id', SpecialtyController.deleteSpecialty);

export const SpecialityRoutes = router