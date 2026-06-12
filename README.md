# Ansek - Backend API

A poadcast, production-ready Node.js backend for a Ansek with JWT authentication, MongoDB, Multer file uploads, and comprehensive REST APIs.

## Features

✅ **Authentication & Authorization**
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Role-based access control (Admin/User)
- Access and refresh tokens
- Protected routes

✅ **News Module**
- Categories and subcategories management
- Full-featured article CRUD
- Slug generation for SEO
- Featured and trending articles
- Search, pagination, and filtering
- Image uploads (featured + gallery)
- View count tracking
- SEO-friendly metadata

✅ **Podcast Module**
- Episode management with full CRUD
- Audio file uploads (MP3, WAV, M4A)
- Thumbnail uploads
- Featured and latest episodes
- View tracking
- Pagination and search

✅ **Contact Form**
- Submit contact messages
- Admin message management
- Mark as read/replied
- Status tracking

✅ **Security & Best Practices**
- Helmet for HTTP headers
- CORS configuration
- Rate limiting
- MongoDB sanitization (NoSQL injection protection)
- XSS protection
- Input validation with express-validator
- Centralized error handling
- poadcast API response format

✅ **File Management**
- Multer configuration for image and audio uploads
- Separate upload directories (news, podcast, profile)
- File type and size validation
- Automatic file cleanup on deletion

✅ **API Documentation**
- Swagger UI documentation
- Interactive API explorer at `/api-docs`

## Project Structure

```
src/
├── app.js                          # Express app setup with middleware
Config/
├── DBconnect.js                    # MongoDB connection
├── multerConfig.js                 # Multer configuration
├── swaggerConfig.js                # Swagger documentation
Controllers/
├── authController.js               # Auth logic (register, login, etc.)
├── articleController.js            # Article CRUD & operations
├── categoryController.js           # Category management
├── subcategoryController.js        # Subcategory management
├── episodeController.js            # Episode management
├── contactController.js            # Contact form handling
Models/
├── User.js                         # User schema & methods
├── Article.js                      # Article schema
├── Category.js                     # Category schema
├── Subcategory.js                  # Subcategory schema
├── Episode.js                      # Episode schema
├── Contact.js                      # Contact schema
middlewares/
├── errorHandler.js                 # Centralized error handler
├── authMiddleware.js               # JWT authentication
├── adminMiddleware.js              # Admin authorization
Routers/
├── authRoutes.js                   # Auth endpoints
├── newsRoutes.js                   # News endpoints
├── categoryRoutes.js               # Category endpoints
├── subcategoryRoutes.js            # Subcategory endpoints
├── episodeRoutes.js                # Episode endpoints
├── contactRoutes.js                # Contact endpoints
validations/
├── validators.js                   # Input validation rules
utils/
├── ApiError.js                     # Custom error class
├── asyncHandler.js                 # Async error wrapper
├── jwt.js                          # JWT utilities
├── slugify.js                      # Slug generation
├── fileHelper.js                   # File deletion helper
uploads/
├── news/                           # Article images
├── podcast/                        # Podcast audio & thumbnails
└── profile/                        # User profile images
index.js                            # Server entry point
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Steps

1. **Clone or navigate to project folder**
   ```bash
   cd ansek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`**
   ```env
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/news-podcast
   JWT_SECRET=your_secure_jwt_secret_key
   JWT_REFRESH_SECRET=your_secure_refresh_secret_key
   NODE_ENV=development
   ```

5. **Ensure MongoDB is running**
   ```bash
   # If local MongoDB
   mongod
   ```

6. **Start the server**
   ```bash
   npm run dev      # Development with nodemon
   npm start        # Production
   ```

Server runs at `http://localhost:3000`

API Docs available at `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (protected)

### News Articles
- `GET /api/news` - Get all articles (with pagination, filtering, search)
- `GET /api/news/trending` - Get trending articles
- `GET /api/news/featured` - Get featured articles
- `GET /api/news/:slug` - Get article by slug
- `POST /api/news` - Create article (protected, with image upload)
- `PUT /api/news/:id` - Update article (protected)
- `DELETE /api/news/:id` - Delete article (protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Subcategories
- `GET /api/subcategories` - Get all subcategories
- `GET /api/subcategories/:slug` - Get subcategory by slug
- `POST /api/subcategories` - Create subcategory (admin only)
- `PUT /api/subcategories/:id` - Update subcategory (admin only)
- `DELETE /api/subcategories/:id` - Delete subcategory (admin only)

### Podcasts/Episodes
- `GET /api/episodes` - Get all episodes (with pagination, search)
- `GET /api/episodes/featured` - Get featured episodes
- `GET /api/episodes/latest` - Get latest episodes
- `GET /api/episodes/:slug` - Get episode by slug
- `POST /api/episodes` - Create episode (admin only, audio upload)
- `PUT /api/episodes/:id` - Update episode (admin only)
- `DELETE /api/episodes/:id` - Delete episode (admin only)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (admin only)
- `PATCH /api/contact/:id/read` - Mark message as read (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## File Upload

### Supported Formats
- **Images**: jpg, jpeg, png, webp
- **Audio**: mp3, wav, m4a

### Max File Size
- 50 MB per file

### Upload Endpoints
- News images: `POST /api/news` (with multipart/form-data)
- Episode audio: `POST /api/episodes` (with multipart/form-data)

## Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting, XSS Protection, MongoDB Sanitization
- **Documentation**: Swagger/OpenAPI
- **Logging**: Morgan
- **Development**: Nodemon

## Security Features

✅ Helmet - Secure HTTP headers
✅ CORS - Cross-origin resource sharing
✅ Rate Limiting - Prevent abuse (100 requests per 15 mins)
✅ MongoDB Sanitization - Prevent NoSQL injection
✅ XSS Protection - Clean user input
✅ JWT - Secure authentication
✅ Password Hashing - bcryptjs with salt rounds
✅ Input Validation - express-validator
✅ Error Handling - Centralized with proper HTTP codes

## Development

### Start dev server with auto-reload
```bash
npm run dev
```

### Create `.env` file from template
```bash
cp .env.example .env
```

### View API docs
Open browser: `http://localhost:3000/api-docs`

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager (PM2)
3. Configure MongoDB cloud connection (MongoDB Atlas)
4. Set strong JWT secrets
5. Enable CORS for frontend domain only
6. Use HTTPS
7. Set rate limiting appropriately
8. Configure environment variables securely

## Example Usage

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Article (with image)
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Article" \
  -F "content=Article content here" \
  -F "category=CATEGORY_ID" \
  -F "featuredImage=@/path/to/image.jpg"
```

## License

ISC

## Support

For issues and questions, please check the API documentation at `/api-docs`
#   A n s e k B a c k e n d  
 #   A n s e k B a c k e n d  
 