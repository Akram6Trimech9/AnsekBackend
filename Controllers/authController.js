const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../Models/User');
const jwtUtils = require('../utils/jwt');
const slugify = require('../utils/slugify');

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError('Email already exists', 400);
  const user = await User.create({ fullName, email, password, role: 'user' });
  const accessToken = jwtUtils.signAccessToken({ id: user._id });
  const refreshToken = jwtUtils.signRefreshToken({ id: user._id });
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { user: { id: user._id, fullName: user.fullName, email: user.email }, accessToken, refreshToken },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) throw new ApiError('Invalid email or password', 400);
  const accessToken = jwtUtils.signAccessToken({ id: user._id });
  const refreshToken = jwtUtils.signRefreshToken({ id: user._id });
  res.json({
    success: true,
    message: 'Login successful',
    data: { user: { id: user._id, fullName: user.fullName, email: user.email }, accessToken, refreshToken },
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success: true, data: user });
});

module.exports = { register, login, me };
