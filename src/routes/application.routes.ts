import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();
const applicationController = new ApplicationController();

router.post('/', authenticate, authorizeRoles('Trainee'), (req, res) => applicationController.createApplication(req, res));
router.get('/:id', authenticate, (req, res) => applicationController.getApplicationById(req, res));
router.get('/trainee/:traineeId', authenticate, (req, res) => applicationController.getApplicationsByTrainee(req, res));
router.get('/internship/:internshipId', authenticate, (req, res) => applicationController.getApplicationsByInternship(req, res));
router.put('/:id/status', authenticate, authorizeRoles('Company'), (req, res) => applicationController.updateApplicationStatus(req, res));
router.delete('/:id', authenticate, (req, res) => applicationController.deleteApplication(req, res));

export default router;