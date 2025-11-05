export const serverErrorHandler = (error, req, res, next) => {
  if (req.headers['accept'] && req.headers['accept'].includes('text/html')) {
    res.status(500).render('error.html', {
      title: 'Internal Server Error',
      message: 'Ha ocurrido un error inesperado.\nInténtelo de nuevo más tarde...',
    });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const notFoundErrorHandler = (req, res, next) => {
  if (req.headers['accept'] && req.headers['accept'].includes('text/html')) {
    res.status(404).render('error.html', {
      title: 'ERROR 404',
      message: 'La ruta solicitada no se encuentra',
    });
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
};
