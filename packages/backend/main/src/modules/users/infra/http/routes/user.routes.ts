import express, { Router } from 'express';

import ValidationUsersController from '../middlewares/validations/UserController';
import usersController from '../controllers/UserController';

const router: Router = express.Router();
const validationUser = new ValidationUsersController();

router.post('/', [validationUser.execute], usersController.create);

export default router;
