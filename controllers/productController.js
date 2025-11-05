import { Product } from '../models/Product.js';

export const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.find().populate('owner');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  addProduct: async (req, res, next) => {
    const product = await Product({
      name: req.body.name,
      owner: req.body.owner,
      price: req.body.price,
      productTag: req.body.productTag,
    });
    try {
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      if (error.code && error.code === 11000) {
        res.status(400).json({
          message: 'Nombre duplicado',
        });
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
        });
      }
    }
  },
  removeProduct: async (req, res, next) => {},
};
