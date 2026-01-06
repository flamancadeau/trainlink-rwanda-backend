import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/profile', authenticate, (req, res) => userController.getProfile(req, res));
router.put('/profile', authenticate, (req, res) => userController.updateProfile(req, res));
router.delete('/profile', authenticate, (req, res) => userController.deleteUser(req, res));

export default router;