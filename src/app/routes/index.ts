import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { UserRoutes } from '../modules/users/user.route';
import { AcademinSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademinSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
