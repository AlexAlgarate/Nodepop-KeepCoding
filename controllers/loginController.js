import { User } from '../models/User.js';

export const loginController = {
  index: (req, res, next) => {
    res.locals.errors = '';
    res.locals.email = '';
    res.render('login.html');
  },
  postLogin: async (req, res, next) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).select('+password');

      if (!user || !(await user.comparePassword(req.body.password))) {
        res.locals.email = req.body.email;
        res.locals.errors = 'Invalid credentials';
        return !res.render('login.html');
      }

      req.session.userId = user.id;

      res.redirect(req.query.redir || '/');
    } catch (error) {
      next(error);
    }
  },
  logOut: (req, res, next) => {
    req.session.regenerate((error) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  },
};
