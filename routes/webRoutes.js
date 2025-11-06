import express from 'express';

import { guard } from '../lib/middleware/authMiddleware.js';
import { Product } from '../models/Product.js';
import { loginController } from '../controllers/loginController.js';

export const router = express.Router();

router.get('/welcome', (req, res, next) => {
  res.status(200).send(`
    <h1>Bienvenido a nuestro servidor</h1>
    <p>Este servidor está escrito con Node.js</p>
    `);
});

router.get('/about', guard, (req, res, next) => {
  res.render('about.html');
});

router.get('/', guard, async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const products = await Product.find({
      owner: userId,
    });

    res.render('home.html', {
      title: 'Practica de NODE JIIJJIJIJIJIIJ',
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