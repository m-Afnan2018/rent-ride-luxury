# Rent Ride Luxury — API Documentation

**Base URL:** `http://localhost:5000/api`  
**Production:** `https://api.yourdomain.com/api`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Response Format](#2-response-format)
3. [Auth Endpoints](#3-auth-endpoints)
4. [Users](#4-users)
5. [Cars](#5-cars)
6. [Blogs](#6-blogs)
7. [Leads (Enquiries)](#7-leads-enquiries)
8. [Testimonials](#8-testimonials)
9. [Categories](#9-categories)
10. [Types](#10-types)
11. [Brands](#11-brands)
12. [Tags](#12-tags)
13. [FAQs](#13-faqs)
14. [Media (File Upload)](#14-media-file-upload)
15. [Page Meta](#15-page-meta)
16. [Site Settings](#16-site-settings)
17. [Pagination](#17-pagination)
18. [Error Codes](#18-error-codes)

---

## 1. Authentication

Protected routes require a **Bearer token** in the `Authorization` header.

```
Authorization: Bearer <access_token>
```

- **Access token** expires in **15 minutes**
- **Refresh token** expires in **7 days**
- On 401 response, call `POST /auth/refresh` to get a new access token
- Store both tokens securely (e.g. `httpOnly` cookie or memory — avoid `localStorage` for access token)

---

## 2. Response Format

Every endpoint returns the same structure:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { } 
}
```

List endpoints also include:

```json
{
  "success": true,
  "message": "...",
  "data": [ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

Error response:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ]
}
```

---

## 3. Auth Endpoints

### POST `/auth/login`
Login with email and password. Returns access + refresh tokens.

> Rate limited: 20 requests per 15 minutes per IP.

**Request Body:**
```json
{
  "email": "admin@rentluxury.com",
  "password": "Admin@123456"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGci...",
    "refresh_token": "eyJhbGci...",
    "user": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "name": "Admin",
      "email_id": "admin@rentluxury.com",
      "role": "admin",
      "status": "active",
      "phone_number": "+1234567890",
      "display_picture": null,
      "createdAt": "2026-05-06T10:00:00.000Z",
      "updatedAt": "2026-05-06T10:00:00.000Z"
    }
  }
}
```

**Errors:**
- `401` — Invalid credentials
- `429` — Too many attempts

---

### POST `/auth/refresh`
Get a new access token using the refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGci..."
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "access_token": "eyJhbGci..."
  }
}
```

**Errors:**
- `401` — Invalid or expired refresh token

---

### POST `/auth/logout`
Invalidates the refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGci..."
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

## 4. Users

> All user routes require `Authorization: Bearer <token>`.  
> Only `admin` role can manage users. `staff` can access `/me` only.

### GET `/users/me` 🔒
Get the currently logged-in user's profile.

**Response `200`:**
```json
{
  "success": true,
  "message": "Profile fetched",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Admin",
    "email_id": "admin@rentluxury.com",
    "role": "admin",
    "status": "active",
    "phone_number": "+1234567890",
    "display_picture": "http://localhost:5000/uploads/general/abc123.jpg"
  }
}
```

---

### PUT `/users/me/password` 🔒
Change the current user's password.

**Request Body:**
```json
{
  "current_password": "Admin@123456",
  "new_password": "NewPass@789"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Password updated",
  "data": null
}
```

---

### GET `/users` 🔒 `admin only`
List all users.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 100) |
| `role` | string | Filter by `admin` or `staff` |
| `status` | string | Filter by `active` or `suspended` |

---

### POST `/users` 🔒 `admin only`
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email_id": "john@example.com",
  "password": "SecurePass@123",
  "role": "staff",
  "phone_number": "+1234567890"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email_id": "john@example.com",
    "role": "staff",
    "status": "active"
  }
}
```

---

### GET `/users/:id` 🔒 `admin only`
Get a single user by ID.

---

### PUT `/users/:id` 🔒 `admin only`
Update a user.

**Request Body (all optional):**
```json
{
  "name": "Jane Doe",
  "email_id": "jane@example.com",
  "role": "admin",
  "status": "suspended",
  "phone_number": "+1987654321",
  "display_picture": "http://localhost:5000/uploads/general/photo.jpg"
}
```

---

### DELETE `/users/:id` 🔒 `admin only`
Delete a user. Cannot delete your own account.

---

## 5. Cars

### GET `/cars` — Public
List all cars with optional filters.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `brand` | ObjectId | Filter by brand ID |
| `type` | ObjectId | Filter by type ID |
| `category` | ObjectId | Filter by category ID |
| `fuel_type` | string | `petrol` \| `diesel` \| `electric` \| `hybrid` |
| `availability` | string | `available` \| `rented` \| `maintenance` |
| `transmission` | string | `automatic` \| `manual` |
| `is_featured` | boolean | `true` to get featured cars only |

**Response `200`:**
```json
{
  "success": true,
  "message": "Cars fetched",
  "data": [
    {
      "_id": "665f1a2b...",
      "name": "Lamborghini Urus",
      "slug": "lamborghini-urus",
      "description": "The ultimate super SUV...",
      "model": "Urus",
      "brand_id": { "_id": "...", "name": "Lamborghini", "slug": "lamborghini", "image": "..." },
      "type_id": { "_id": "...", "name": "SUV", "slug": "suv" },
      "category_id": { "_id": "...", "name": "Luxury", "slug": "luxury" },
      "prices": [
        { "label": "Per Day", "amount": 1500, "currency": "USD" },
        { "label": "Per Week", "amount": 9000, "currency": "USD" }
      ],
      "year": 2024,
      "fuel_type": "petrol",
      "transmission": "automatic",
      "seating_capacity": 5,
      "is_featured": true,
      "availability_status": "available",
      "color": "Arancio Borealis",
      "features": ["Panoramic Sunroof", "Bang & Olufsen Sound", "AWD"],
      "media": [
        { "url": "http://localhost:5000/uploads/cars/abc.jpg", "type": "image" }
      ],
      "feature_image": "http://localhost:5000/uploads/cars/main.jpg",
      "meta": {
        "title": "Lamborghini Urus Rental | Rent Ride Luxury",
        "description": "...",
        "keywords": "lamborghini urus rental",
        "og_title": "...",
        "og_description": "...",
        "og_image": "...",
        "canonical_url": "...",
        "robots": "index, follow"
      },
      "createdAt": "2026-05-06T10:00:00.000Z",
      "updatedAt": "2026-05-06T10:00:00.000Z"
    }
  ],
  "pagination": { "total": 25, "page": 1, "limit": 10, "totalPages": 3, "hasNext": true, "hasPrev": false }
}
```

---

### GET `/cars/slug/:slug` — Public
Get a single car by its slug.

**Example:** `GET /cars/slug/lamborghini-urus`

**Response `200`:** Same car object as above (single item in `data`).

**Errors:**
- `404` — Car not found

---

### GET `/cars/:id` 🔒
Get a single car by its MongoDB ID.

---

### POST `/cars` 🔒
Create a new car. Slug is auto-generated from `name`.

**Request Body:**
```json
{
  "name": "Lamborghini Urus",
  "description": "The ultimate super SUV",
  "model": "Urus",
  "brand_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "type_id": "665f1a2b3c4d5e6f7a8b9c0e",
  "category_id": "665f1a2b3c4d5e6f7a8b9c0f",
  "prices": [
    { "label": "Per Day", "amount": 1500, "currency": "USD" }
  ],
  "year": 2024,
  "fuel_type": "petrol",
  "transmission": "automatic",
  "seating_capacity": 5,
  "is_featured": true,
  "availability_status": "available",
  "color": "Arancio Borealis",
  "features": ["Panoramic Sunroof", "AWD"],
  "media": [
    { "url": "http://localhost:5000/uploads/cars/abc.jpg", "type": "image" }
  ],
  "feature_image": "http://localhost:5000/uploads/cars/main.jpg",
  "meta": {
    "title": "Lamborghini Urus Rental",
    "description": "Rent the Lamborghini Urus...",
    "keywords": "lamborghini urus rental",
    "robots": "index, follow"
  }
}
```

**Response `201`:** Created car object.

---

### PUT `/cars/:id` 🔒
Update a car. All fields are optional. If `name` changes, slug is auto-updated.

---

### DELETE `/cars/:id` 🔒
Delete a car.

---

## 6. Blogs

### GET `/blogs` — Public
List published blogs.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `tag` | ObjectId | Filter by tag ID |

**Response `200`:**
```json
{
  "success": true,
  "message": "Blogs fetched",
  "data": [
    {
      "_id": "...",
      "title": "Top 10 Luxury Cars to Rent in Dubai",
      "slug": "top-10-luxury-cars-to-rent-in-dubai",
      "cover_image": "http://localhost:5000/uploads/blogs/cover.jpg",
      "author_id": { "_id": "...", "name": "Admin", "display_picture": null },
      "status": "published",
      "published_at": "2026-05-06T10:00:00.000Z",
      "reading_time": 5,
      "meta": { "title": "...", "description": "...", "keywords": "...", "og_title": "...", "twitter_card": "summary_large_image" },
      "createdAt": "2026-05-06T10:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

> Note: `content` field is **not** returned in list view to keep responses light. Fetch single blog to get full content.

---

### GET `/blogs/slug/:slug` — Public
Get a single published blog by slug. Includes full `content` and attached `tags`.

**Response `200`:**
```json
{
  "success": true,
  "message": "Blog fetched",
  "data": {
    "_id": "...",
    "title": "Top 10 Luxury Cars...",
    "slug": "top-10-luxury-cars-to-rent-in-dubai",
    "content": "<p>Full HTML content here...</p>",
    "cover_image": "...",
    "author_id": { "_id": "...", "name": "Admin", "display_picture": null },
    "status": "published",
    "published_at": "2026-05-06T10:00:00.000Z",
    "reading_time": 5,
    "tags": [
      { "_id": "...", "name": "Luxury", "slug": "luxury" },
      { "_id": "...", "name": "Dubai", "slug": "dubai" }
    ],
    "meta": { ... }
  }
}
```

---

### GET `/blogs/admin/all` 🔒
List all blogs (including drafts). Supports `?status=draft|published` filter.

---

### GET `/blogs/:id` 🔒
Get a single blog by ID (any status).

---

### POST `/blogs` 🔒
Create a blog. Slug is auto-generated from `title`.

**Request Body:**
```json
{
  "title": "Top 10 Luxury Cars to Rent in Dubai",
  "content": "<p>Full HTML content...</p>",
  "cover_image": "http://localhost:5000/uploads/blogs/cover.jpg",
  "status": "draft",
  "tags": ["tag_id_1", "tag_id_2"],
  "meta": {
    "title": "Top 10 Luxury Cars | Rent Ride Luxury",
    "description": "...",
    "keywords": "luxury cars dubai",
    "og_title": "...",
    "twitter_card": "summary_large_image",
    "twitter_title": "..."
  }
}
```

**Response `201`:** Created blog object with `tags` array.

---

### PUT `/blogs/:id` 🔒
Update a blog. Pass `tags` array to replace all tags; omit `tags` to leave them unchanged.

---

### DELETE `/blogs/:id` 🔒
Delete a blog and its tag associations.

---

## 7. Leads (Enquiries)

### POST `/leads` — Public
Submit an enquiry/lead from the website contact form.

> Rate limited: 10 requests per hour per IP.

**Request Body:**
```json
{
  "fullname": "John Smith",
  "email_id": "john@example.com",
  "phone_number": "+1234567890",
  "description": "I am interested in renting the Lamborghini Urus for a week.",
  "car_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "rental_start_date": "2026-06-01",
  "rental_end_date": "2026-06-07",
  "source": "website"
}
```

> `car_id`, `description`, `rental_start_date`, `rental_end_date`, `source` are optional.  
> `source` defaults to `"website"`.

**Response `201`:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "_id": "...",
    "fullname": "John Smith",
    "email_id": "john@example.com",
    "phone_number": "+1234567890",
    "status": "new",
    "source": "website",
    "createdAt": "2026-05-06T10:00:00.000Z"
  }
}
```

**Errors:**
- `422` — Validation failed (missing required fields)
- `429` — Too many enquiries

---

### GET `/leads` 🔒
List all leads.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `status` | string | `new` \| `contacted` \| `qualified` \| `lost` \| `converted` |
| `source` | string | `website` \| `instagram` \| `whatsapp` \| `phone` \| `other` |
| `assigned_to` | ObjectId | Filter by assigned staff ID |

---

### GET `/leads/:id` 🔒
Get a single lead.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "fullname": "John Smith",
    "email_id": "john@example.com",
    "phone_number": "+1234567890",
    "description": "...",
    "car_id": { "_id": "...", "name": "Lamborghini Urus", "slug": "...", "feature_image": "..." },
    "source": "website",
    "assigned_to": { "_id": "...", "name": "Admin", "email_id": "admin@..." },
    "rental_start_date": "2026-06-01T00:00:00.000Z",
    "rental_end_date": "2026-06-07T00:00:00.000Z",
    "status": "new",
    "createdAt": "2026-05-06T10:00:00.000Z"
  }
}
```

---

### PUT `/leads/:id` 🔒
Update a lead (e.g. change status, assign to staff).

**Request Body (all optional):**
```json
{
  "status": "contacted",
  "assigned_to": "665f1a2b3c4d5e6f7a8b9c0d",
  "source": "phone"
}
```

---

### DELETE `/leads/:id` 🔒
Delete a lead.

---

## 8. Testimonials

### GET `/testimonials` — Public
List **approved** testimonials only.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `is_featured` | boolean | `true` to get featured only |

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "image": "http://localhost:5000/uploads/general/avatar.jpg",
      "name": "James Wilson",
      "position_company": "CEO, TechCorp",
      "rating": 5,
      "review": "Absolutely incredible experience. The car was spotless...",
      "time": "May 2026",
      "car_id": { "_id": "...", "name": "Lamborghini Urus", "slug": "..." },
      "status": "approved",
      "is_featured": true
    }
  ]
}
```

---

### GET `/testimonials/admin/all` 🔒
List all testimonials including pending ones. Supports `?status=pending|approved` filter.

---

### GET `/testimonials/:id` 🔒
Get a single testimonial.

---

### POST `/testimonials` 🔒
Create a testimonial.

**Request Body:**
```json
{
  "name": "James Wilson",
  "position_company": "CEO, TechCorp",
  "rating": 5,
  "review": "Absolutely incredible experience...",
  "time": "May 2026",
  "car_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "image": "http://localhost:5000/uploads/general/avatar.jpg",
  "status": "approved",
  "is_featured": false
}
```

---

### PUT `/testimonials/:id` 🔒
Update a testimonial.

---

### DELETE `/testimonials/:id` 🔒
Delete a testimonial.

---

## 9. Categories

### GET `/categories` — Public
List all categories.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "Luxury", "slug": "luxury", "description": "Premium luxury vehicles" }
  ],
  "pagination": { ... }
}
```

### GET `/categories/:id` — Public
Get a single category.

### POST `/categories` 🔒
**Request Body:**
```json
{ "name": "Luxury", "description": "Premium luxury vehicles" }
```

### PUT `/categories/:id` 🔒
**Request Body (all optional):**
```json
{ "name": "Ultra Luxury", "description": "Updated description" }
```

### DELETE `/categories/:id` 🔒

---

## 10. Types

> Same structure as Categories. Includes an optional `image` field.

### GET `/types` — Public
### GET `/types/:id` — Public
### POST `/types` 🔒
**Request Body:**
```json
{ "name": "SUV", "description": "Sport Utility Vehicles", "image": "http://..." }
```
### PUT `/types/:id` 🔒
### DELETE `/types/:id` 🔒

---

## 11. Brands

> Same structure as Types. Includes an optional `image` field.

### GET `/brands` — Public
### GET `/brands/:id` — Public
### POST `/brands` 🔒
**Request Body:**
```json
{ "name": "Lamborghini", "description": "Italian luxury sports cars", "image": "http://..." }
```
### PUT `/brands/:id` 🔒
### DELETE `/brands/:id` 🔒

---

## 12. Tags

### GET `/tags` — Public
### GET `/tags/:id` — Public
### POST `/tags` 🔒
**Request Body:**
```json
{ "name": "Dubai" }
```
### PUT `/tags/:id` 🔒
### DELETE `/tags/:id` 🔒

---

## 13. FAQs

### GET `/faqs` — Public
List **active** FAQs, sorted by `order` (ascending).

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "question": "How do I make a rental enquiry?",
      "answer": "Simply fill out the enquiry form on any car page...",
      "order": 1,
      "is_active": true
    }
  ]
}
```

### GET `/faqs/admin/all` 🔒
List all FAQs. Supports `?is_active=true|false` filter.

### GET `/faqs/:id` 🔒
### POST `/faqs` 🔒
**Request Body:**
```json
{
  "question": "How do I make a rental enquiry?",
  "answer": "Simply fill out the enquiry form...",
  "order": 1,
  "is_active": true
}
```
### PUT `/faqs/:id` 🔒
### DELETE `/faqs/:id` 🔒

---

## 14. Media (File Upload)

> All media routes require authentication.

### POST `/media` 🔒
Upload a file. Send as `multipart/form-data`.

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Image (jpg, png, webp, gif) or Video (mp4, webm, mov) |
| `entity_type` | string | No | `car` \| `blog` \| `brand` \| `type` \| `general` (default: `general`) |
| `entity_id` | ObjectId | No | ID of the related entity |

**Max file size: 10 MB**

**Response `201`:**
```json
{
  "success": true,
  "message": "File uploaded",
  "data": {
    "_id": "...",
    "name": "original-filename.jpg",
    "type": "image",
    "size": 245760,
    "url": "http://localhost:5000/uploads/cars/a1b2c3d4-uuid.jpg",
    "mime_type": "image/jpeg",
    "entity_type": "car",
    "entity_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "createdAt": "2026-05-06T10:00:00.000Z"
  }
}
```

> After uploading, use the returned `url` in Car's `media[]`, `feature_image`, Blog's `cover_image`, etc.

---

### GET `/media` 🔒
List all media files.

**Query Params:**

| Param | Type | Description |
|-------|------|-------------|
| `entity_type` | string | Filter by entity type |
| `entity_id` | ObjectId | Filter by entity ID |
| `type` | string | `image` or `video` |
| `page` | number | Page number |
| `limit` | number | Items per page |

---

### GET `/media/:id` 🔒
Get single media record.

---

### DELETE `/media/:id` 🔒
Delete media record **and** the actual file from disk.

---

## 15. Page Meta

Used for per-page SEO settings (about, contact, home, etc.).

### GET `/page-meta?url=/about` — Public
Get SEO meta for a specific page URL.

**Query Params:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | The page URL path (e.g. `/about`, `/contact`) |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "url": "/about",
    "title": "About Us | Rent Ride Luxury",
    "description": "Learn about our luxury car rental service...",
    "keywords": "about rent ride luxury",
    "og_title": "About Us | Rent Ride Luxury",
    "og_description": "...",
    "og_image": "http://localhost:5000/uploads/general/og-about.jpg",
    "canonical_url": "https://yourdomain.com/about",
    "schema_markup": "{\"@context\": \"...\"} ",
    "robots": "index, follow"
  }
}
```

---

### GET `/page-meta/all` 🔒
List all page meta records.

---

### GET `/page-meta/:id` 🔒
Get a page meta by ID.

---

### POST `/page-meta` 🔒
Create page meta for a URL.

**Request Body:**
```json
{
  "url": "/about",
  "title": "About Us | Rent Ride Luxury",
  "description": "Learn about our luxury car rental service",
  "keywords": "about luxury car rental",
  "og_title": "About Us | Rent Ride Luxury",
  "og_description": "...",
  "og_image": "http://...",
  "canonical_url": "https://yourdomain.com/about",
  "schema_markup": "{\"@context\": \"https://schema.org\"}",
  "robots": "index, follow"
}
```

---

### PUT `/page-meta/:id` 🔒
Update a page meta record.

---

### DELETE `/page-meta/:id` 🔒

---

## 16. Site Settings

Global SEO and tracking settings. Only one document exists (singleton).

### GET `/site-settings` — Public
Get the global site settings.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Rent Ride Luxury",
    "description": "Premium luxury car rental services",
    "keyword": "luxury car rental, exotic cars",
    "og_image": "http://localhost:5000/uploads/general/og-default.jpg",
    "favicon": "http://localhost:5000/uploads/general/favicon.ico",
    "canonical_url": "https://yourdomain.com",
    "google_analytics_id": "G-XXXXXXXXXX",
    "google_tag_manager_id": "GTM-XXXXXXX",
    "facebook_pixel_id": "1234567890",
    "updatedAt": "2026-05-06T10:00:00.000Z"
  }
}
```

---

### PUT `/site-settings` 🔒
Update site settings. All fields optional.

**Request Body:**
```json
{
  "title": "Rent Ride Luxury",
  "description": "Premium luxury car rental services",
  "keyword": "luxury car rental, exotic cars",
  "og_image": "http://localhost:5000/uploads/general/og.jpg",
  "favicon": "http://localhost:5000/uploads/general/favicon.ico",
  "canonical_url": "https://yourdomain.com",
  "google_analytics_id": "G-XXXXXXXXXX",
  "google_tag_manager_id": "GTM-XXXXXXX",
  "facebook_pixel_id": "1234567890"
}
```

---

## 17. Pagination

All list endpoints support these query params:

| Param | Default | Max | Description |
|-------|---------|-----|-------------|
| `page` | `1` | — | Page number |
| `limit` | `10` | `100` | Items per page |

**Pagination response object:**
```json
{
  "total": 100,
  "page": 2,
  "limit": 10,
  "totalPages": 10,
  "hasNext": true,
  "hasPrev": true
}
```

**Example:** `GET /cars?page=2&limit=12&brand=665f1a...&fuel_type=petrol`

---

## 18. Error Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created successfully |
| `400` | Bad request / validation error |
| `401` | Unauthenticated — missing or invalid token |
| `403` | Forbidden — insufficient role permissions |
| `404` | Resource not found |
| `422` | Validation failed — check `errors[]` array in response |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

---

## Quick Reference — Public vs Protected

| Endpoint | Method | Auth |
|----------|--------|------|
| `/auth/login` | POST | — |
| `/auth/refresh` | POST | — |
| `/auth/logout` | POST | — |
| `/cars` | GET | — |
| `/cars/slug/:slug` | GET | — |
| `/blogs` | GET | — |
| `/blogs/slug/:slug` | GET | — |
| `/testimonials` | GET | — |
| `/categories` | GET | — |
| `/types` | GET | — |
| `/brands` | GET | — |
| `/tags` | GET | — |
| `/faqs` | GET | — |
| `/site-settings` | GET | — |
| `/page-meta?url=` | GET | — |
| `/leads` | POST | — |
| Everything else | * | 🔒 Bearer token required |

---

## Notes for Frontend

1. **Token refresh flow** — Intercept all `401` responses, call `POST /auth/refresh`, retry the original request with the new access token. If refresh also fails, redirect to login.

2. **Slug vs ID** — Use slugs for public-facing pages (SEO-friendly URLs). Use IDs only in the admin panel.

3. **File upload workflow** — Upload file via `POST /media` first, get back the `url`, then use that URL in the car/blog create/update payload.

4. **Blog content** — The `content` field contains raw HTML. Render it with `dangerouslySetInnerHTML` (React) or `v-html` (Vue). Sanitize if accepting user-generated content.

5. **Reading time** — `reading_time` is in minutes, auto-calculated on the backend. No need to compute it on frontend.

6. **Site settings** — Call `GET /site-settings` once on app load (or per page) to get global SEO data, analytics IDs, and favicon.

7. **Page meta** — Call `GET /page-meta?url=/your-page-path` on each static page to get page-specific SEO data. Falls back gracefully with `404` if not set.

8. **CORS** — The API accepts requests from `http://localhost:3000` (dev) and your production domain. Credentials (cookies) are supported.
