import express, { Router } from 'express';

import ValidationOrdersController from '../middlewares/validations/OrdersController';
import ordersController from '../controllers/OrderController';

const router: Router = express.Router();
const validationOrder = new ValidationOrdersController();

router.post('/', [validationOrder.create], ordersController.create);
router.put('/:id', [validationOrder.update], ordersController.update);
router.get('/', ordersController.index);
router.delete('/:id', ordersController.delete);
router.get('/:id', ordersController.show);
router.post(
  '/:id/item',
  [validationOrder.createItem],
  ordersController.createItem,
);
router.delete('/:id/item/:item_id', ordersController.deleteOrderItem);

export default router;
