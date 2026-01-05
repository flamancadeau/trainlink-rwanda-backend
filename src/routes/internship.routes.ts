import { Router } from 'express';
import { InternshipController } from '../controllers/internship.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { upload } from '../config/cloudinary.config';

const router = Router();
const internshipController = new InternshipController();

router.post('/', authenticate, authorizeRoles('Company'), (req, res) => internshipController.createInternship(req, res));
router.get('/', (req, res) => internshipController.getAllInternships(req, res));
router.get('/:id', (req, res) => internshipController.getInternshipById(req, res));
router.get('/company/:companyId', (req, res) => internshipController.getInternshipsByCompany(req, res));
router.put('/:id', authenticate, authorizeRoles('Company'), (req, res) => internshipController.updateInternship(req, res));
router.post('/:id/image', authenticate, authorizeRoles('Company'), upload.single('image'), (req, res) => internshipController.uploadInternshipImage(req, res));
router.delete('/:id', authenticate, authorizeRoles('Company'), (req, res) => internshipController.deleteInternship(req, res));

export default router;
