import { Router } from 'express';
import { TraineeController } from '../controllers/trainee.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { upload } from '../config/cloudinary.config';

const router = Router();
const traineeController = new TraineeController();

router.post('/', authenticate, (req, res) => traineeController.createTrainee(req, res));
router.get('/', authenticate, (req, res) => traineeController.getAllTrainees(req, res));
router.get('/:id', authenticate, (req, res) => traineeController.getTraineeById(req, res));
router.put('/:id', authenticate, authorizeRoles('Trainee'), (req, res) => traineeController.updateTrainee(req, res));
router.post('/:id/resume', authenticate, authorizeRoles('Trainee'), upload.single('resume'), (req, res) => traineeController.uploadResume(req, res));
router.delete('/:id', authenticate, authorizeRoles('Trainee'), (req, res) => traineeController.deleteTrainee(req, res));

export default router;