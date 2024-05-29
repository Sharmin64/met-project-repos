import { Request, Response } from 'express';
import { UserService } from './user.service';
import studentvaliadationSchema from '../student/student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating  a schema validation using joi

    const { password, student: studentData } = req.body;
    const { error } = studentvaliadationSchema.validate(studentData);
    console.log({ error });
    if (error) {
      res.status(500).json({
        success: true,
        message: 'Something went wrong ! ',
        error,
      });
    }

    const result = await UserService.createStudentInDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something went wrong ! ',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
