import express from 'express';

import { guard } from '../lib/middleware/authMiddleware.js';
import { Product } from '../models/Product.js';
import { loginController } from '../controllers/loginController.js';

export const router = express.Router();
router.get('/', guard, (req, res, next) => {
  res.render('home.html');
});
router.get('/welcome', (req, res, next) => {
  res.status(200).send(`
    <h1>Bienvenido a nuestro servidor</h1>
    <p>Este servidor está escrito con Node.js</p>
    `);
});

router.get('/createProduct', guard, (req, res, next) => {
  try {
    const productName = '';
    const productPrice = '';
    const productTag = '';
    res.render('createProduct.html', {
      productName,
      productPrice,
      productTag,
      errors: [],
    });
  } catch (error) {
    next(error);
  }
});

router.get('/products', guard, async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const products = await Product.find({
      owner: userId,
    });

    res.render('products.html', {
      title: 'Practica de NODE',
      message: "We're Coming Soon...",
      userId,
      products: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logOut);
