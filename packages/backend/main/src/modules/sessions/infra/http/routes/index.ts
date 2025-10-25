import express, { Router } from 'express';
import sessionsRoutes from './sessions.routes';

const router: Router = express.Router();

router.use(sessionsRoutes);

export default router;
