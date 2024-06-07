// import { Schema, model, connect } from 'mongoose';

import { Model, Types } from 'mongoose';
// import { Student } from './student.model';

export type TUsername = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  // password?: string;
  user: Types.ObjectId;
  name: TUsername;
  email: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemister: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};

// ?for creating static

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
}

// ?for creating instance
// export interface StudentMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
