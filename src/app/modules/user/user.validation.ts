import z from 'zod';
// Add this to user.validation.ts

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email("Invalid email format"),
      profilePhoto: z.url("Invalid URL format").optional(),
      contactNumber: z.string().min(1, "Contact number is required"),
    }),
  }),
});
const createSuAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email("Invalid email format"),
      profilePhoto: z.url("Invalid URL format").optional(),
      contactNumber: z.string().min(1, "Contact number is required"),
    }),
  }),
});

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


// Export it
export const UserValidation = {
  createDoctorZodSchema,
  createAdminValidationSchema, // Add this
  createSuAdminValidationSchema
};