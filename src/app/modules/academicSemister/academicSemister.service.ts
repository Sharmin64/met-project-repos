import { academicSemisterNameCodeMapper } from './academicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semister Code');
  }
  const result = await AcademicSemister.create(payload);

  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const getAllAcademicSemistersFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};

const updateAcademicSemisterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemister>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getSingleAcademicSemesterFromDB,
  getAllAcademicSemistersFromDB,
  updateAcademicSemisterIntoDB,
};
