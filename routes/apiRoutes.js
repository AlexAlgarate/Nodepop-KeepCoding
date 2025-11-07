import express from 'express';
import { param, query } from 'express-validator';

import { healthCall } from '../controllers/healthController.js';
import { productController } from '../controllers/productAPIController.js';

export const router = express.Router();

// health endopint
router.get(['/health', '/ping'], healthCall);

// productController endpoints
// router.get('/products', productController.getAllProducts);
router.get(
  '/products',
  query('skip', 'Skip mus be a positive number.')
    .optional()
    .isInt({
      min: 1,
    })
    .toInt(),
  query('limit', 'Limit must be a positive number.')
    .optional()
    .isInt({
      min: 1,
    })
    .toInt(),
  query('owner', 'Owner must be an ObjectId of Mongoose').optional().isMongoId(),
  query('name', 'Name must be a string').optional().isString().trim(),
  query('priceMin', 'priceMin must be a positive number')
    .optional()
    .isInt({
      min: 0,
    })
    .toInt(),
  query('priceMax', 'priceMax must be a positive number')
    .optional()
    .isInt({
      min: 0,
    })
    .toInt(),
  query('tag', 'Tag must be a string').optional().isString().trim(),
  productController.getAllProducts
);
router.post('/products', productController.addProduct);
router.delete(
  '/products/:id',
  param('id', 'ID must be a MongoDB ObjectId').isMongoId(),
  productController.removeProduct
);
