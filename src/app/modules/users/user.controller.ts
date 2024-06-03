// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from '../student/student.zod.validation';
// import studentvaliadationSchema from '../student/student.validation';

const createStudent = catchAsync(async (req, res) => {
  // creating  a schema validation using joi

  const { password, student: studentData } = req.body;

  // ?data validation using zod
  // const zodParsedData = studentValidationSchema.parse(studentData);
  // const result = await UserService.createStudentInDB(password, zodParsedData);
  const result = await UserService.createStudentInDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};

// const { error } = studentvaliadationSchema.validate(studentData);
// console.log({ error });
// if (error) {
//   res.status(500).json({
//     success: true,
//     message: 'Something went wrong ! ',
//     error,
//   });
// }
