const jwt = require('jsonwebtoken');
const { User } = require('../db').models;

const isAuthenticated = (req, res, next) => {
  const error = new Error('Unauthorized');
  error.status = 401;

  const token = req.headers.authorization;

  if (!token || !token.length) {
    return next(error);
  }

  const data = jwt.verify(token.replace('Bearer ', ''), 'mysecretkey');
  if (!data) return next(error);

  User.findOne({
    where: { id: data.userId },
    attributes: { exclude: ['password'] },
  })
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(() => {
      return next(error);
    });
};

module.exports = { isAuthenticated };
