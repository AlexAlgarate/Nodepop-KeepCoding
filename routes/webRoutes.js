import express from 'express';

import { guard } from '../lib/middleware/authMiddleware.js';
import { loginController } from '../controllers/loginController.js';
import { productController } from '../controllers/productWEBController.js';

export const router = express.Router();

// home
router.get('/', guard, productController.showHome);

// Show all products of the logged user
router.get('/products', guard, productController.getAllProducts);

// Create new products via user form
router.get('/createProduct', guard, productController.AddNewProduct);
router.post('/products/create', guard, productController.postAddNewProduct);

// Remove product
router.post('/products/delete/:id', guard, productController.removeProduct);

// Log in contoller
router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logOut);
