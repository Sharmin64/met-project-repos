import express from 'express';
import { AcademicSemisterControllers } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidations } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    AcademicSemisterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.createAcademicSemister,
);

router.get(
  '/:semisterId',
  AcademicSemisterControllers.getSingleAcademicSemister,
);

router.patch(
  '/:semisterId',
  validateRequest(
    AcademicSemisterValidations.updateAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.updateAcademicSemister,
);

router.get('/', AcademicSemisterControllers.getAllAcademicSemisters);

export const AcademinSemisterRoutes = router;
