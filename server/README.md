# 📘 Smart Reconciliation & Audit System – Backend

## 📌 Overview

This is the backend service for the **Smart Reconciliation & Audit System**, built using:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

The backend handles:

- Authentication & Authorization
- OTP Verification
- File Upload & Async Processing
- Transaction Reconciliation
- Audit Logging
- Dashboard Aggregation
- Role-Based Access Control
- Centralized Error Handling

---

# 🏗 Architecture Overview

Client (React) → Express API (Node.js) → MongoDB(Mongoose)

### Core Design Principles

- Service-based business logic
- Immutable audit logging
- Async file processing
- Idempotent uploads
- Centralized error handling
- Role-based access control
- API versioning

---

# 📂 Folder Structure

server/

├── public/

│ └── (Uploaded CSV files for async processing)

│

├── src/

│ ├── config/

│ ├── controllers/

│ ├── errors/

│ ├── middleware/

│ ├── models/

│ ├── router/

│ ├── services/

│ ├── utils/

│ ├── app.ts

│ └── index.ts

└── package.json

---

# 📁 /public

Stores uploaded CSV files temporarily for asynchronous processing.

Purpose:

- File persistence during reconciliation
- Enables background processing
- Keeps upload pipeline non-blocking

---

# 📁 /src/config

Contains:

- MongoDB connection setup

Ensures infrastructure setup is separated from business logic.

---

# 📁 /src/controllers

Handles all endpoint logic.

Controllers are responsible for:

- Handling request and response
- Calling service layer
- Returning structured API responses

Controllers include:

- auditController
- authController
- dashboardController
- otpController
- recordController
- uploadController
- userController

---

# 📁 /src/errors

Custom reusable error classes.

Examples:

- BadRequestError
- UnauthorizedError
- NotFoundError

Benefits:

- Consistent error responses
- Cleaner controller logic
- Centralized error formatting

---

# 📁 /src/middleware

Middleware layer includes:

- authMiddleware (JWT verification)
- roleMiddleware (Role-based access control)
- fileUploadHandler (Multer configuration)
- notFoundMiddleware
- errorHandlerMiddleware (centralized error handling)

This ensures:

- Secure route protection
- Standardized error responses
- Clean API structure

---

# 📁 /src/models

Mongoose schema definitions for:

## 1️⃣ Users

- name
- email
- password
- role (Admin | Analyst | Viewer)
- isActive

## 2️⃣ UploadJobs

Tracks file processing lifecycle.

- fileName
- fileHash
- status (Processing | Completed | Failed)
- totalRecords
- createdBy
- timestamps

## 3️⃣ Records

Stores transaction data.

- transactionId
- amount
- referenceNumber
- date
- status
- uploadJobId
- createdBy (File | System)
- timestamps

## 4️⃣ AuditLogs

Immutable audit history.

- recordId
- oldValue
- newValue
- userId
- timestamps

## 5️⃣ OTPs

Handles OTP verification logic.

- email
- otp
- createdAt

---

# 📁 /src/router

Defines API routes and binds them to controllers.

All routes are versioned under:

`/api/v1/`

---

# 📁 /src/services

Contains business logic layer.

## Reconciliation Service

Handles:

- Exact match detection
- Partial match (±2% tolerance)
- Duplicate detection
- Unmatched classification

---

# 📁 /src/utils

Utility functions such as:

- File hashing (for idempotency)

## File Hashing

Used to:

- Prevent duplicate file uploads
- Ensure idempotent processing
- Reuse existing UploadJob if file already processed

---

# 📦 API Endpoints

Base path:

`/api/v1/`

Total: **14 endpoints**

---

## 👤 Users (2 endpoints)

`GET /users`
`GET /users/check`

---

## 🔐 Auth (3 endpoints)

`POST /auth/login`
`POST /auth/signup`
`POST /auth/change-password`

---

## 🔑 OTP (2 endpoints)

`POST /otp/send`
`POST /otp/verify`

---

## 📤 Uploads (3 endpoints)

`POST /uploads`
`GET /uploads`
`GET /uploads/:id`

Features:

- Async file processing
- UploadJob tracking
- Status polling
- Idempotent uploads

---

## 📊 Dashboard (1 endpoint)

`GET /dashboard`

Returns aggregated statistics:

- Total records
- Matched
- Partial
- Duplicate
- Unmatched
- Accuracy %

Uses MongoDB aggregation pipeline for performance.

---

## 📄 Records (2 endpoints)

`GET /records`
`PATCH /records/:id`

Supports:

- Pagination
- Filtering
- Manual correction
- Audit creation on update

---

## 🧾 Audit (1 endpoint)

`GET /audit/:recordId`

Returns immutable audit timeline entries.

---

# 🔐 Authentication & Authorization

Authentication:

- JWT-based
- Token required for protected routes

Authorization:

- Role-based middleware
- Enforced at route level

| Role    | Upload | Edit | View |
| ------- | ------ | ---- | ---- |
| Admin   | ✅     | ✅   | ✅   |
| Analyst | ✅     | ✅   | ✅   |
| Viewer  | ❌     | ❌   | ✅   |

Backend enforces security even if frontend hides buttons.

---

# ⚙ Reconciliation Logic

Reconciliation rules:

### Exact Match

transactionId AND amount match

### Partial Match

referenceNumber matches
AND amount within ±2%

### Duplicate

Same transactionId appears more than once

### Unmatched

No matching system record found

---

# 🧾 Audit Logging

Audit logs are:

- Immutable (append-only)
- Field-level diff aware
- Timestamped
- User-attributed
- Read-only

This simulates real-world compliance and accountability systems.

---

# 🚀 Async Upload Flow

1. File uploaded via Multer
2. UploadJob created (status = Processing)
3. API responds immediately
4. Background service parses CSV
5. Bulk insert records
6. Reconciliation runs
7. UploadJob updated to Completed

Ensures non-blocking API behavior.

---

# 🛡 Error Handling Strategy

- Custom error classes
- Centralized error middleware
- Standardized JSON error responses
- 404 handler for unknown routes

Improves API reliability and maintainability.

---

# 📊 Performance Considerations

- MongoDB indexing
- Pagination
- Aggregation pipelines
- Bulk inserts
- Async processing
- Idempotent uploads via file hash

---

# ⚙ Environment Configuration

Create a `.env` file inside `server/`:

- MONGO_CONNECTION_URL
- ADMIN_ROLE_SECERT
- ANALYST_ROLE_SECERT
- PRIMARY_GMAIL
- PRIMARY_GMAIL_APP_PASS
- ACCESS_TOKEN_PRIVATE_KEY
- CLIENT_BASE_URLS

---

# 🚀 Running the Backend

Inside `server/` directory:

### Install dependencies

`npm install`

### Production build

`npm run build`

---
