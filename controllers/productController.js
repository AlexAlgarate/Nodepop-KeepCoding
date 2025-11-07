import { validationResult, matchedData } from 'express-validator';

import { Product } from '../models/Product.js';

export const productController = {
  getAllProducts: async (req, res, next) => {
    // Express validator
    const result = validationResult(req);
    const data = matchedData(req);

    const filter = {};

    if (result.errors.length > 0) {
      return res.status(400).json({
        errors: result.error,
      });
    }

    if (data.owner) {
      filter.owner = data.owner;
    }

    if (data.tag) {
      const tags = data.tag.split(',').map((tag) => tag.trim());
      filter.productTag = { $all: tags };
    }

    if (data.priceMin !== undefined || data.priceMax !== undefined) {
      filter.price = {};
      if (data.priceMin !== undefined) filter.price.$gte = data.priceMin;
      if (data.priceMax !== undefined) filter.price.$lte = data.priceMax;
    }

    if (data.name) {
      const escaped = data.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = new RegExp(`^${escaped}`, 'i');
    }
    const skip = data.skip ?? 0;
    const limit = data.limit ?? 100;

    try {
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('owner');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  addProduct: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const { name, owner, price, productTag } = req.body;
      const product = new Product({
        name,
        owner,
        price,
        productTag: Array.isArray(productTag)
          ? productTag.map((tag) => tag.trim())
          : productTag.split(',').map((tag) => tag.trim()),
      });

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
          error: error.message,
        });
      }
    }
  },
  removeProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;

      const result = await Product.deleteOne({ _id: productId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          error: 'Product not found',
        });
      }
      res.status(200).json({ message: 'Product deleted succesfully' });
    } catch (error) {
      next(error);
    }
  },
};
