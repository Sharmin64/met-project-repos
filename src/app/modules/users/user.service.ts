/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import config from '../../config';
import { TAcademicSemister } from '../academicSemister/academicSemister.interface';

import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

// todo apatoto comment  kora thakuk proyojone comment out korbo
const createStudentInDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = 'student';
  // year semisterCode 4 digit number
  // find academic semister
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemister,
  );
  // set auto genarated id
  userData.id = await generatedStudentId(
    admissionSemister as TAcademicSemister,
  );

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentInDB,
};
