const jwtUtils = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const User = require('../Models/User');

const protect = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];
    if (!token) throw new ApiError('Not authorized, token missing', 401);
    const decoded = jwtUtils.verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new ApiError('User not found', 401);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };
