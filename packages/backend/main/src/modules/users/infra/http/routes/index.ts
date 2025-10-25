import express, { Router } from 'express';

import userRoutes from './user.routes';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';

const router: Router = express.Router();
// const authenticate = new Authenticate();

// router.use(authenticate.execute);
router.use(userRoutes);

export default router;
