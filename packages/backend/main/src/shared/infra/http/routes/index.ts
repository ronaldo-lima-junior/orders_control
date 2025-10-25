import express, { Router } from 'express';
import userRoutes from '@modules/users/infra/http/routes';
import sessionRoutes from '@modules/sessions/infra/http/routes';
import productRoutes from '@modules/products/infra/http/routes';
import orderRoutes from '@modules/orders/infra/http/routes';
import asaasWebHookRoutes from '@modules/orders/infra/http/routes/webhook.routes';

const router: Router = express.Router();

router.use('/sessions', sessionRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/webhook', asaasWebHookRoutes);

export default router;
