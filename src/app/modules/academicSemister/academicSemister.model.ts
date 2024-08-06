import { Schema, model } from 'mongoose';

import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemister.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TAcademicSemister } from './academicSemister.interface';

const academicSemisterSchema = new Schema<TAcademicSemister>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemisterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemisterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});
academicSemisterSchema.pre('save', async function (next) {
  const isSemisterExists = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExists) {
    throw new AppError(httpStatus.CONFLICT, 'Semister already exists!');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
