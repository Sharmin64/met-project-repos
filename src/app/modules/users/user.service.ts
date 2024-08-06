/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemister } from '../academicSemister/academicSemister.interface';

import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentInDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = 'student';
  // year semisterCode 4 digit number
  // find academic semister info
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemister,
  );

  // transaction & rollback system
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generatedStudentId(
      admissionSemister as TAcademicSemister,
    );

    // create a user ( transaction -1 )
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference _id
    // create a student ( transaction - 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      ' Sorry Failed to create student',
    );
  }
  //  finally {
  //   session.endSession();
  // }
};

export const UserService = {
  createStudentInDB,
};
