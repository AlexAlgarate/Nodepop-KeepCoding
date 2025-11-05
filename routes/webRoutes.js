import express from 'express';


export const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send(`
    <h1>Bienvenido a nuestro servidor</h1>
    <p>Este servidor está escrito con Node.js</p>
    `)
})