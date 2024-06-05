// eslint-disable-next-line @typescript-eslint/no-explicit-any

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemisterServices } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created successfully',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemisterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const getAllAcademicSemisters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemistersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const updateAcademicSemister = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemisterServices.updateAcademicSemisterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemisterControllers = {
  createAcademicSemister,
  getSingleAcademicSemister,
  getAllAcademicSemisters,
  updateAcademicSemister,
};
