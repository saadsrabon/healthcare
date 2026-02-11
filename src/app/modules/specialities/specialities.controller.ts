import { SpecialityService } from "./specialities.service";

//create specialities controller
const createSpeciality = async (req, res) => {
    try {
        const data = req.body;
        const result = await SpecialityService.createSpeciality(data);
        res.status(200).json({
            message: "Speciality created successfully",
            data: result,
            success: true,
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Error creating speciality",
            success: false,
            error: error
        });
    }
};