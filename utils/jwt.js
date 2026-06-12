const jwt = require('jsonwebtoken');

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
};

const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refreshsecret', { expiresIn: '7d' });
};

const verifyToken = (token, refresh = false) => {
  const secret = refresh ? process.env.JWT_REFRESH_SECRET || 'refreshsecret' : process.env.JWT_SECRET || 'secret';
  return jwt.verify(token, secret);
};

module.exports = { signAccessToken, signRefreshToken, verifyToken };
