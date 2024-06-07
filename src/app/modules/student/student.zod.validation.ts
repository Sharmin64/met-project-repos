import { z } from 'zod';

// Validation for Username
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'First name must be capitalized' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    }),
});

// Validation for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim(),
});

// Validation for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});

// Validation for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20).optional(),
    student: z.object({
      user: z.string(), // Assuming this is an ObjectId string
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).trim(),
      contactNo: z.string().trim(),
      emergencyContactNo: z.string().trim(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim(),
      parmanentAddress: z.string().trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemister: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'First name must be capitalized' },
    )
    .optional(), // Make optional for update
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    })
    .optional(), // Make optional for update
});

// Validation for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().optional(),
});

// Validation for LocalGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

// Validation for Student
const updateStudentValidationSchema = z
  .object({
    body: z.object({
      // password: z.string().max(20).optional(),
      student: z
        .object({
          user: z.string().optional(),
          name: updateUserNameValidationSchema.optional(),
          dateOfBirth: z.string().optional(),
          email: z
            .string()
            .email({ message: 'Invalid email address' })
            .trim()
            .optional(),
          contactNo: z.string().trim().optional(),
          emergencyContactNo: z.string().trim().optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAddress: z.string().trim().optional(),
          parmanentAddress: z.string().trim().optional(),
          guardian: updateGuardianValidationSchema.optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          admissionSemister: z.string().optional(),
          profileImg: z.string().optional(),
        })
        .partial(),
    }),
  })
  .partial();

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
