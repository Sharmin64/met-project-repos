import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// todo apatoto comment  kora thakuk proyojone comment out korbo
const createStudentInDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // set manually genarated id
  userData.id = '2030100001';

  // test for id
  const lastUser = await User.findOne().sort({ id: -1 });
  const newId = lastUser
    ? (parseInt(lastUser.id) + 1).toString()
    : '2030100001';
  userData.id = newId;

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentInDB,
};

// const createStudentInDB = async (studentData: TStudent) => {
//     if (await Student.isUserExists(studentData.id)) {
//       throw new Error('User already exists!');
//     }
//     const result = await Student.create(studentData); //builtin static method

//     // const student = new Student(studentData); //create an instance

//     // if (await student.isUserExists(studentData.id)) {
//     //   throw new Error('User already exists!');
//     // }
//     // const result = await student.save(); //built in instance method
//     return result;
//   };
