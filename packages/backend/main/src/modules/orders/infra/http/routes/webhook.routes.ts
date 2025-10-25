import express, { Router } from 'express';

import webhookAsaasBillingController from '../controllers/WebhookAsaasBillingController';

const router: Router = express.Router();

router.post('/asaas/billing', webhookAsaasBillingController.update);

export default router;
