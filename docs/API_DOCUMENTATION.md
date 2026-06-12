# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Register User
- **Endpoint**: `POST /api/auth/register`
- **Auth**: None
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
  ```

### Login User
- **Endpoint**: `POST /api/auth/login`
- **Auth**: None
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
  ```

### Get Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Auth**: Required (Bearer token)
- **Response** (200):
  ```json
  {
    "success": true,
    "data": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
  ```

---

## Categories

### Get All Categories
- **Endpoint**: `GET /api/categories`
- **Auth**: None
- **Query Parameters**: None
- **Response** (200):
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "cat_id",
        "name": "Technology",
        "slug": "technology",
        "description": "Tech news",
        "image": "uploads/news/image.jpg",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

### Get Category by Slug
- **Endpoint**: `GET /api/categories/:slug`
- **Auth**: None
- **Response** (200): Same as above (single category)

### Create Category
- **Endpoint**: `POST /api/categories`
- **Auth**: Required (Admin only)
- **Content-Type**: `multipart/form-data`
- **Body**:
  ```
  name: "Technology"
  description: "Tech news and updates"
  image: <file>
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Category created",
    "data": { /* category object */ }
  }
  ```

### Update Category
- **Endpoint**: `PUT /api/categories/:id`
- **Auth**: Required (Admin only)
- **Content-Type**: `multipart/form-data`
- **Body**: Same as create (all optional)
- **Response** (200): Updated category object

### Delete Category
- **Endpoint**: `DELETE /api/categories/:id`
- **Auth**: Required (Admin only)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Category deleted"
  }
  ```

---

## News Articles

### Get All Articles
- **Endpoint**: `GET /api/news`
- **Auth**: None
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `category`: Category ID to filter
  - `status`: 'draft' or 'published' (default: 'published')
  - `search`: Search in title and content
- **Response** (200):
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "article_id",
        "title": "Amazing News",
        "slug": "amazing-news",
        "content": "Full content",
        "category": { /* category object */ },
        "author": { /* user object */ },
        "views": 100,
        "likes": 10,
        "status": "published",
        "isFeatured": false,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

### Get Trending Articles
- **Endpoint**: `GET /api/news/trending`
- **Auth**: None
- **Response** (200): Array of 10 most viewed articles

### Get Featured Articles
- **Endpoint**: `GET /api/news/featured`
- **Auth**: None
- **Response** (200): Array of 5 featured articles

### Get Article by Slug
- **Endpoint**: `GET /api/news/:slug`
- **Auth**: None
- **Response** (200): Single article object with incremented views

### Create Article
- **Endpoint**: `POST /api/news`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  ```
  title: "My Article"
  shortDescription: "Short desc"
  fullDescription: "Full desc"
  content: "Article content"
  category: "category_id"
  subCategory: "subcategory_id" (optional)
  tags: "tag1,tag2" (optional)
  status: "draft" or "published"
  isFeatured: true/false
  metaTitle: "SEO Title"
  metaDescription: "SEO Description"
  keywords: "key1,key2"
  featuredImage: <file>
  galleryImages: <file1, file2, ...>
  ```
- **Response** (201): Created article object

### Update Article
- **Endpoint**: `PUT /api/news/:id`
- **Auth**: Required (Author or Admin)
- **Body**: Same as create (all optional)
- **Response** (200): Updated article object

### Delete Article
- **Endpoint**: `DELETE /api/news/:id`
- **Auth**: Required (Author or Admin)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Article deleted"
  }
  ```

---

## Subcategories

### Get All Subcategories
- **Endpoint**: `GET /api/subcategories`
- **Auth**: None
- **Query Parameters**:
  - `category`: Parent category ID (optional)

### Get Subcategory by Slug
- **Endpoint**: `GET /api/subcategories/:slug`
- **Auth**: None

### Create Subcategory
- **Endpoint**: `POST /api/subcategories`
- **Auth**: Required (Admin only)
- **Body**:
  ```json
  {
    "category": "category_id",
    "name": "AI",
    "description": "Artificial Intelligence news"
  }
  ```

### Update Subcategory
- **Endpoint**: `PUT /api/subcategories/:id`
- **Auth**: Required (Admin only)

### Delete Subcategory
- **Endpoint**: `DELETE /api/subcategories/:id`
- **Auth**: Required (Admin only)

---

## Episodes (Podcasts)

### Get All Episodes
- **Endpoint**: `GET /api/episodes`
- **Auth**: None
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search in title

### Get Featured Episodes
- **Endpoint**: `GET /api/episodes/featured`
- **Auth**: None
- **Response**: Array of 5 featured episodes

### Get Latest Episodes
- **Endpoint**: `GET /api/episodes/latest`
- **Auth**: None
- **Response**: Array of 10 latest episodes

### Get Episode by Slug
- **Endpoint**: `GET /api/episodes/:slug`
- **Auth**: None

### Create Episode
- **Endpoint**: `POST /api/episodes`
- **Auth**: Required (Admin only)
- **Content-Type**: `multipart/form-data`
- **Body**:
  ```
  title: "Episode 1"
  description: "Episode description"
  episodeNumber: 1
  guestName: "Guest Name"
  tags: "tag1,tag2"
  duration: 3600
  isFeatured: true/false
  audioFile: <file.mp3|.wav|.m4a>
  thumbnail: <image_file>
  ```
- **Response** (201): Created episode object

### Update Episode
- **Endpoint**: `PUT /api/episodes/:id`
- **Auth**: Required (Admin only)
- **Body**: Same as create (all optional)

### Delete Episode
- **Endpoint**: `DELETE /api/episodes/:id`
- **Auth**: Required (Admin only)

---

## Contact Form

### Submit Contact Message
- **Endpoint**: `POST /api/contact`
- **Auth**: None
- **Body**:
  ```json
  {
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry",
    "message": "My message"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Message sent successfully",
    "data": { /* contact object */ }
  }
  ```

### Get All Messages (Admin)
- **Endpoint**: `GET /api/contact`
- **Auth**: Required (Admin only)
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
  - `status`: 'new', 'read', or 'replied'

### Mark Message as Read (Admin)
- **Endpoint**: `PATCH /api/contact/:id/read`
- **Auth**: Required (Admin only)
- **Response** (200): Updated message object with status='read'

### Delete Message (Admin)
- **Endpoint**: `DELETE /api/contact/:id`
- **Auth**: Required (Admin only)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Message deleted"
  }
  ```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid request data
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Not authorized to access this resource
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server error

---

## File Upload Specifications

### Image Upload
- **Supported formats**: jpg, jpeg, png, webp
- **Max size**: 50 MB
- **Upload endpoints**:
  - News featured image: `POST /api/news`
  - News gallery images: `POST /api/news`
  - Category image: `POST /api/categories`
  - Episode thumbnail: `POST /api/episodes`

### Audio Upload
- **Supported formats**: mp3, wav, m4a
- **Max size**: 50 MB
- **Upload endpoint**: `POST /api/episodes`

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes
- **Headers**:
  - `RateLimit-Limit`: 100
  - `RateLimit-Remaining`: Remaining requests
  - `RateLimit-Reset`: Reset timestamp

---

## Pagination

List endpoints support pagination:

```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

Query parameters:
- `page`: Page number (starts at 1)
- `limit`: Items per page
