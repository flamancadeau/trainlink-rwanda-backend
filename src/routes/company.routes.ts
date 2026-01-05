import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { upload } from '../config/cloudinary.config';

const router = Router();
const companyController = new CompanyController();

router.post('/', authenticate, authorizeRoles('Company'), (req, res) => companyController.createCompany(req, res));
router.get('/', (req, res) => companyController.getAllCompanies(req, res));
router.get('/:id', (req, res) => companyController.getCompanyById(req, res));
router.put('/:id', authenticate, authorizeRoles('Company'), (req, res) => companyController.updateCompany(req, res));
router.post('/:id/logo', authenticate, authorizeRoles('Company'), upload.single('logo'), (req, res) => companyController.uploadLogo(req, res));
router.delete('/:id', authenticate, authorizeRoles('Company'), (req, res) => companyController.deleteCompany(req, res));

export default router;
