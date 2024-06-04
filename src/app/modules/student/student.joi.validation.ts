// import Joi from 'joi';
// import validator from 'validator';

// // todo test purpose
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .required()
//     .trim()
//     .max(20)
//     .message('First Name is required and must be less than 20 characters')
//     .custom((value, helper) => {
//       if (value.charAt(0).toUpperCase() !== value.charAt(0)) {
//         return helper.error('"{VALUE}" must be capitalized');
//       }
//       return value;
//     }),
//   middleName: Joi.string().trim(),
//   lastName: Joi.string()
//     .required()
//     .trim()
//     .custom((value, helper) => {
//       if (!validator.isAlpha(value)) {
//         return helper.error('"{VALUE}" must only contain letters');
//       }
//       return value;
//     })
//     .message('Last Name is required and must only contain letters'),
// });

// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().required().trim().message('Father Name is required'),
//   fatherOccupation: Joi.string()
//     .required()
//     .trim()
//     .message('Father Occupation is required'),
//   fatherContactNo: Joi.string()
//     .required()
//     .trim()
//     .message('Father Contact Number is required'),
//   motherName: Joi.string().required().trim().message('Mother Name is required'),
//   motherOccupation: Joi.string()
//     .required()
//     .trim()
//     .message('Mother Occupation is required'),
//   motherContactNo: Joi.string()
//     .required()
//     .trim()
//     .message('Mother Contact Number is required'),
// });

// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string()
//     .required()
//     .trim()
//     .message('Local Guardian Name is required'),
//   occupation: Joi.string()
//     .required()
//     .trim()
//     .message('Local Guardian Occupation is required'),
//   contactNo: Joi.string()
//     .required()
//     .trim()
//     .message('Local Guardian Contact Number is required'),
//   address: Joi.string()
//     .required()
//     .trim()
//     .message('Local Guardian Address is required'),
// });

// const studentvaliadationSchema = Joi.object({
//   id: Joi.string().required().message('Student ID is required'),
//   user: Joi.string().required().message('User ID is required'),
//   name: userNameValidationSchema.required(),
//   gender: Joi.string()
//     .required()
//     .valid('male', 'female', 'other')
//     .message('Gender must be male, female, or other'),
//   dateOfBirth: Joi.string().trim(),
//   email: Joi.string()
//     .required()
//     .email()
//     .message('Email is required and must be a valid email address'),
//   contactNo: Joi.string()
//     .required()
//     .trim()
//     .message('Contact Number is required'),
//   emergencyContactNo: Joi.string()
//     .required()
//     .trim()
//     .message('Emergency Contact Number is required'),
//   bloodGroup: Joi.string().valid(
//     'A+',
//     'A-',
//     'B+',
//     'B-',
//     'AB+',
//     'AB-',
//     'O+',
//     'O-',
//   ),
//   presentAddress: Joi.string()
//     .required()
//     .trim()
//     .message('Present Address is required'),
//   parmanentAddress: Joi.string()
//     .required()
//     .trim()
//     .message('Permanent Address is required'),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   profileImg: Joi.string(),
//   // isActive: Joi.string().valid('active', 'blocked'),
// });

// export default studentvaliadationSchema;
