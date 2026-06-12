const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path');

const { notFound, errorHandler } = require('../middlewares/errorHandler');
const { swaggerUi, specs } = require('../Config/swaggerConfig');

const authRoutes = require('../Routers/authRoutes');
const newsRoutes = require('../Routers/newsRoutes');
const categoryRoutes = require('../Routers/categoryRoutes');
const subcategoryRoutes = require('../Routers/subcategoryRoutes');
const episodeRoutes = require('../Routers/episodeRoutes');
const contactRoutes = require('../Routers/contactRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/episodes', episodeRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
