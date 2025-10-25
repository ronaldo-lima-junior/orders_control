import express, { Router } from 'express';

import productRoutes from './product.routes';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';

const router: Router = express.Router();
const authencicate = new Authenticate();

router.use(authencicate.execute);
router.use(productRoutes);

export default router;
