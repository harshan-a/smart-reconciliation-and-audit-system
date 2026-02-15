# 📘 Smart Reconciliation & Audit System – Frontend

## 📌 Overview

This is the frontend for the **Smart Reconciliation & Audit System**, built using **React + TypeScript (Vite)** and styled with **Tailwind CSS v4**.

The application provides a modern interface for:

- Uploading transaction files
- Viewing reconciliation results
- Monitoring analytics
- Managing records
- Tracking audit logs
- Role-based access control

The frontend communicates with a Node.js + Express with Typescript backend via REST APIs.

---

# 🏗 Architecture Overview

User → React UI → Axios → Backend API → MongoDB

### Design Principles

- Role-based UI rendering
- Clean component architecture
- Centralized error handling
- Backend-driven aggregation

---

# 📂 Folder Structure

client/

├── src/

│ ├── api/ → <span style="font-size: 14px; color: lightblue">api calls and axios setup.</span>

│ ├── assets/ → <span style="font-size: 14px; color: lightblue">static assets like logos and icons.</span>

│ ├── components/ → <span style="font-size: 14px; color: lightblue">small reusable components.</span>

│ ├── context/ → <span style="font-size: 14px; color: lightblue">context apis for state management</span>

│ ├── layout/ → <span style="font-size: 14px; color: lightblue">standard layout for all page.</span>

│ ├── pages/ → <span style="font-size: 14px; color: lightblue">four main pages - Auth, Dashboard, Uploads, Records.</span>

│ ├── utils/ → <span style="font-size: 14px; color: lightblue">app utility functions</span>

│ ├── App.tsx

│ └── main.tsx

├── .env → <span style="font-size: 14px; color: lightblue">VITE_BASE_URL - backend origin for api calls</span>

└── package.json

---

## 📁 `/src/api`

Contains all API-related logic.

- Axios instance configuration
- JWT Authorization header attachment
- Global error interceptor
- Feature-specific API modules

### Responsibilities:

- Attach access token automatically
- Handle API errors centrally
- Keep API calls modular and reusable

---

## 📁 `/src/components`

Reusable UI components such as:

- `📁 filters` → <span style="font-size: 14px; color: lightblue">filters shared between bashboard and records page</span>
- `EmailValidation` → <span style="font-size: 14px; color: lightblue">check email exists then allow to next step. Used in auth page.</span>
- `ErrorPopup` → <span style="font-size: 14px; color: lightblue">Error popup shared across all pages except auth page.</span>
- `LimitFilter` → <span style="font-size: 14px; color: lightblue">Used for pagination in records page.</span>
- `PasswordBar` → <span style="font-size: 14px; color: lightblue">Password input with toggle button</span>
- `ProtectedRoute` → <span style="font-size: 14px; color: lightblue">Automatically redirect to the auth page if the token is missing.</span>

---

## 📁 `/src/context`

Global state management using React Context API.

### AuthContext

- Decodes JWT token
- Stores authenticated user
- Provides role access
- Handles logout functionality

Enables role-based rendering across the app.

---

## 📁 `/src/layout`

Main application layout:

- Sidebar navigation
- Role display
- Logout button
- Global error popup handler

All protected pages are wrapped inside this layout.

---

## 📁 `/src/pages`

### 🔐 Auth Pages
- Login
- Signup
- Forgot Password
- Send OTP
- Verify OTP

### 📊 Core Pages
- Dashboard
- Upload (Admin & Analyst only)
- Records (All roles, Edit restricted)

Each page handles:
- API data fetching
- Loading states
- Role-based UI display
- Interactive actions

---

# 🔐 Authentication & Role-Based Access

Roles supported:

- **Admin**
- **Analyst**
- **Viewer**

| Feature | Admin | Analyst | Viewer |
|----------|--------|----------|----------|
| Upload Files | ✅ | ✅ | ❌ |
| Edit Records | ✅ | ✅ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ |
| View Audit Logs | ✅ | ✅ | ✅ |

### Implementation Details

- JWT stored in localStorage
- Token decoded via `AuthContext`
- Conditional UI rendering based on role
- Protected routes for authenticated access
- Backend still enforces authorization

---

# 📊 Dashboard

Displays:

- Total records
- Matched
- Partial
- Duplicate
- Unmatched
- Accuracy %
- Status distribution chart

Aggregation is performed server-side for efficiency.

---

# 📤 Upload Workflow

1. User selects CSV file
2. File is uploaded to backend
3. Backend creates UploadJob
4. Frontend polls upload status
5. Displays Processing → Completed state

Ensures non-blocking UI experience.

---

# 📄 Records Page

- Paginated table
- Status display
- Edit drawer (Admin & Analyst only)
- Audit timeline drawer

---

# 🧾 Audit Timeline

Enterprise-style audit visualization:

- Vertical timeline layout
- Field-level diff display
- Old value → New value highlighting
- Timestamped entries
- User attribution

Audit logs are read-only.

---

# ⚠ Global Error Handling

Axios interceptor:

- Captures API errors
- Dispatches custom event
- Displays `ErrorPopup` component
- Auto-dismiss behavior

---

# ⚙ Environment Configuration

Create a `.env` file inside the `client/` directory:

VITE_BASE_URL = https:// ==backend-origin== /api/v1

This base URL is used in the Axios instance.

---

# 🚀 Running the Application

Inside the `client/` directory:

### Install dependencies

`npm install`

### Run in development mode

`npm run dev`

### Build for production

`npm run build`

### Preview production build

`npm run preview`
