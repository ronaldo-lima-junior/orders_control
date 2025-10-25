import express, { Router } from 'express';

import ValidationProductsController from '../middlewares/validations/ProductsController';
import productsController from '../controllers/ProductController';

const router: Router = express.Router();
const validationProduct = new ValidationProductsController();

router.post('/', [validationProduct.create], productsController.create);
router.put('/:id', [validationProduct.create], productsController.update);
router.delete('/:id', productsController.delete);
router.get('/', productsController.index);
router.get('/:id', productsController.show);

export default router;
