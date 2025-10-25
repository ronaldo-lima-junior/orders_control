import express, { Router } from 'express';
import ValidationSessionsController from '../middlewares/validations/SessionsController';
import sessionsController from '../controllers/SessionsController';

const router: Router = express.Router();
const validationsSessionsController = new ValidationSessionsController();

router.post(
  '/login',
  [validationsSessionsController.create],
  sessionsController.create,
);

export default router;
