import express, { Router } from 'express';

import userRoutes from './user.routes';
import traineeRoutes from './trainee.routes';
import companyRoutes from './company.routes';
import internshipRoutes from './internship.routes';
import applicationRoutes from './application.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/user', userRoutes );
mainRoute.use('/trainee', traineeRoutes);
mainRoute.use('/company', companyRoutes );
mainRoute.use('/intership', internshipRoutes );
mainRoute.use('/application',applicationRoutes);



export default mainRoute;