import express from 'express';

import { guard } from '../lib/middleware/authMiddleware.js';
import { Product } from '../models/Product.js';
import { loginController } from '../controllers/loginController.js';

export const router = express.Router();

// home
router.get('/', guard, (req, res, next) => {
  res.render('home.html');
});
router.get('/welcome', (req, res, next) => {
  res.status(200).send(`
    <h1>Bienvenido a nuestro servidor</h1>
    <p>Este servidor está escrito con Node.js</p>
    `);
});

// Create new products via form
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

// Show all products of the logged user
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
router.post('/products/create', guard, async (req, res, next) => {
  try {
    const { name, price, tags } = req.body;

    if (!name || !price) {
      return next();
    }

    if (parseInt(price) < 0) {
      return next();
    }

    const product = new Product({
      name: name.trim(),
      owner: req.session.userId,
      price: parseInt(price),
      productTag: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    });

    await product.save();
    res.redirect('/products');
  } catch (error) {
    if (error.code && error.code === 11000) {
      next(error);
    }
  }
});

// Log in contoller
router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logOut);
