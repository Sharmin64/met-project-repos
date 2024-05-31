import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
// import studentValidationSchema from '../student/student.zod.validation';
// import studentvaliadationSchema from '../student/student.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating  a schema validation using joi

    const { password, student: studentData } = req.body;

    // ?data validation using zod
    // const zodParsedData = studentValidationSchema.parse(studentData);
    // const result = await UserService.createStudentInDB(password, zodParsedData);
    const result = await UserService.createStudentInDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err);
  }
};

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
