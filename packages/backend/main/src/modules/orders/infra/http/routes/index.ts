import express, { Router } from 'express';

import orderRoutes from './order.routes';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';

const router: Router = express.Router();
const authencicate = new Authenticate();

router.use(authencicate.execute);
router.use(orderRoutes);

export default router;
