import { Product } from '../models/Product.js';

export const productController = {
  showHome: (req, res, next) => {
    res.render('home.html');
  },
  getAllProducts: async (req, res, next) => {
    try {
      const userId = req.session.userId;

      const products = await Product.find({
        owner: userId,
      });

      res.render('products.html', {
        products: products,
      });
    } catch (error) {
      next(error);
    }
  },
  AddNewProduct: (req, res, next) => {
    try {
      res.render('createProduct.html', {
        productName: '',
        productPrice: '',
        productTag: '',
        errors: [],
      });
    } catch (error) {
      next(error);
    }
  },
  postAddNewProduct: async (req, res, next) => {
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
  },
  removeProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) {
        return next();
      }

      await Product.findByIdAndDelete(id);

      res.redirect('/products');
    } catch (error) {
      res.redirect('/products');
    }
  },
};
