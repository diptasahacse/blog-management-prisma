# Prisma Blog Application

A secure, role-based blogging platform built with **Prisma ORM** and **PostgreSQL**, supporting modern authentication, content creation, and admin moderation.

---

## 📌 Overview

The **Prisma Blog Application** is a full-featured blog platform where users can create and manage blog posts, interact through comments, and administrators can moderate content.  
The system enforces strict role-based access control and follows best practices for scalability, security, and maintainability.

---

## 🎯 Purpose

The purpose of this project is to:
- Build a modern blog system using **Prisma ORM**
- Implement secure authentication and authorization
- Support role-based access for users and admins
- Demonstrate clean database design and API architecture

---

## 🔍 Scope

The application allows users to:

- Register and log in using **Email/Password** or **Google OAuth**
- Create, update, and delete their own blog posts
- Comment on published blog posts

Administrators can:

- Manage all blog posts
- Moderate comments by approving or rejecting them

---

## 👥 User Roles & Permissions

| Role     | Description           | Permissions |
|---------|----------------------|-------------|
| Visitor | Not logged in        | View published posts |
| User    | Registered user      | Create/manage own posts, comment |
| Admin   | Platform moderator   | Manage all posts, approve/reject comments |

---

## ⚙️ Functional Requirements

### 🔐 Authentication & Authorization

#### FR-1: User Registration
- Users can register using email and password
- Email must be unique
- Password must be securely hashed

#### FR-2: User Login
Users can log in using:
- Email & Password
- Google OAuth  

If a Google-authenticated user does not exist:
- The system automatically creates an account

#### FR-3: Role-Based Access Control
- Authorization is enforced at the API level
- Users can access only their own resources
- Admins can access all resources

---

### 👤 User Management

#### FR-4: User Profile
Each user account stores:
- Name
- Email
- Role (`USER` / `ADMIN`)

---

### 📝 Blog Post Management

#### FR-5: Create Post
- Only authenticated users can create posts
- Required fields:
  - Title
  - Content

#### FR-6: Update Post
- Users can update only their own posts
- Admins can update any post

#### FR-7: Delete Post
- Users can delete their own posts
- Admins can delete any post

#### FR-8: View Posts
- All users can view published posts
- Post metadata is visible:
  - Author
  - Published date

---

### 💬 Comment Management

#### FR-9: Create Comment
- Only authenticated users can comment
- Comments are created with status `APPROVED` by default

#### FR-10: Comment Moderation
Admins can:
- Approve comments
- Reject comments

#### FR-11: Comment Visibility
- Only `APPROVED` comments are publicly visible

---

## 🧩 Non-Functional Requirements

### 🔒 Security
- Secure authentication mechanisms
- Prevent unauthorized API access

### ⚡ Performance
- Fast API response times
- Pagination for blog posts

### 📈 Scalability
- Database schema supports future growth
- Clean Prisma relations and proper indexing

### 🛠 Maintainability
- Modular project structure
- Clear separation of concerns
- Prisma migrations for schema evolution

---

## 🗄 Database & ORM

### ORM
- **Prisma ORM**

### Database
- **PostgreSQL**

---

## 🚀 Tech Stack (Suggested)

- Backend: Node.js / Express / Next.js API Routes
- ORM: Prisma
- Database: PostgreSQL
- Authentication: JWT + Google OAuth
- Password Hashing: bcrypt
- Authorization: Middleware-based RBAC

---

## 📄 License

This project is intended for learning and development purposes.

---

## ✨ Author

Developed by Dipta Saha
