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
const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  user: z.string(), // Assuming this is an ObjectId string
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().trim().optional(),
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
  profileImg: z.string().url().optional(),
  // isActive: z.enum(['active', 'blocked']).default('active').optional(), // Uncomment if needed
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
