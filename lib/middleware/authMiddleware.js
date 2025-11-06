import session from 'express-session';
import connectMongo from 'connect-mongo';

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

export function guard(req, res, next) {
  const redirect = req.url;

  if (!req.session.userId) {
    return res.redirect(`/login?redir=${redirect}`);
  }
  next();
}

export const sessionMiddleware = session({
  name: 'nodeapi-session-entrega',
  secret: 'secreto',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: INACTIVITY_2_DAYS,
  },
  store: connectMongo.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017'
  })
});

export function sessionInViews(req, res, next) {
  res.locals.session = req.session;
  next();
}
