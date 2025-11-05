import express from 'express';
import { healthCall } from '../controllers/healthController.js';
import { productController } from '../controllers/productController.js';

export const router = express.Router();

// health endopint
router.get(['/health', '/ping'], healthCall);

// productController endpoints
// router.get('/products', productController.getAllProducts);
router.get('/products', productController.getAllProducts);
router.post('/products', productController.addProduct);
router.delete('/products/:id', productController.removeProduct);