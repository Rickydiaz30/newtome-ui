# Newtome 🛒

[Live App](https://dxsg03couz5uo.cloudfront.net)

Newtome is a full-stack marketplace application that enables users to create accounts, list items, and interact through an offer-based system.
The project emphasizes **secure backend design, scalable architecture, production-safe database management, and automated testing practices** using AWS, Docker, and Spring Boot.

---

## 🔧 Tech Stack

### Frontend

- Angular (Standalone Components, Routing, Services)

### Backend

- Java 21
- Spring Boot (REST API)
- Spring Data JPA

### Security

- JWT Authentication (custom filter + token service)

### Database

- MySQL (Dockerized)
- Flyway (database version control)

### Testing

- JUnit 5
- Mockito (unit testing)
- Spring Boot Integration Testing (MockMvc + real DB)

### Cloud & Deployment

- AWS EC2 (backend hosting)
- AWS S3 (static frontend + image storage)
- AWS CloudFront (CDN + API routing)
- Docker & Docker Compose (containerization)

### Tools

- Postman
- Git / GitHub (PR-based workflow)
- IntelliJ / VS Code

---

## 🧱 Architecture Overview

The backend follows a **layered architecture** for scalability and maintainability:

- **Controller Layer** → Handles HTTP requests/responses
- **Service Layer** → Business logic
- **Repository Layer** → Database access (JPA)
- **DTOs & Mappers** → Clean API contracts

### 📂 Core Modules

- **Users** → Authentication and account management
- **Catalog** → Listings and categories
- **Offers** → Buyer/seller offer workflow
- **Uploads** → Image handling via S3
- **Security** → JWT authentication and request filtering

---

## 🔐 Security Implementation

- Implemented **JWT-based authentication**
  - Custom `JwtAuthFilter`
  - Token generation & validation service

- Secure password storage using **BCrypt hashing**
- Protected API endpoints (authenticated access only)
- Configured CORS for frontend-backend communication

---

## 🗄️ Database & Migrations (Flyway)

The application uses **Flyway** to manage schema evolution in a production-safe way.

### Migration Strategy

- Existing schema was **baselined into Flyway**
- All changes are version-controlled:

```
V1__initial_schema.sql
V2__add_last_login_to_users.sql
V3__add_created_at_column.sql
V4__backfill_created_at.sql
V5__make_created_at_not_null.sql
```

- Migrations run automatically on application startup

### Benefits

- Prevents schema drift across environments
- Enables safe incremental database updates
- Ensures consistency between development and production

---

## 🧪 Testing Strategy

The backend includes both **unit and integration testing** to ensure reliability:

### Unit Testing

- Service-layer testing using **Mockito**
- Covers authentication logic (success + failure scenarios)

### Integration Testing

- End-to-end API testing using **MockMvc**
- Runs against a **real MySQL test database (Docker)**
- Verifies:
  - Authentication flow
  - JWT generation
  - Database updates (e.g., `last_login_at`)

- Uses **isolated test database (`newtome_test`)** to prevent data loss
- Handles relational cleanup in correct order:

  ```
  offers → listings → users
  ```

### Why This Matters

- Ensures real system behavior (not just mocked logic)
- Prevents regressions during development
- Reflects production-like conditions

---

## 📦 Features

- User registration and authentication
- Secure login with JWT-based authorization
- CRUD operations for listings and categories
- Offer-based marketplace workflow
- Image upload system backed by S3
- CDN delivery for frontend and images

---

## 💰 Offer System

Newtome implements a **real-world marketplace interaction model**:

- Users submit offers on listings
- Sellers can accept or reject offers
- Backend manages offer states and relationships
- Enforces buyer/seller interaction rules beyond basic CRUD

---

## ☁️ Deployment Architecture

The application is deployed using a **containerized AWS architecture**:

### Backend & Database

- Backend API runs in a Docker container on an EC2 instance
- MySQL runs in a separate Docker container using Docker Compose

### Frontend & Assets

- Angular frontend is hosted in an S3 bucket
- User-uploaded images are stored in S3

### Content Delivery (CloudFront)

CloudFront is used as a **global CDN and routing layer**:

- Serves frontend globally with low latency
- Delivers images via CDN
- Routes API requests to the EC2 backend

---

## 🧩 Infrastructure Summary

```
Frontend  → S3 → CloudFront
Images    → S3 → CloudFront
API       → EC2 (Docker) → CloudFront
Database  → MySQL (Docker on EC2)
```

---

## 🚀 Key Learning Outcomes

- Built secure REST APIs using Spring Boot
- Implemented **JWT authentication and request filtering**
- Introduced **Flyway for database version control**
- Designed scalable systems using **layered architecture**
- Implemented **integration testing with real database**
- Solved real-world issues like:
  - Test data isolation
  - Foreign key constraint handling
  - Environment-based configuration

- Deployed a full-stack app using **Docker and AWS**
- Applied **professional Git workflow (feature branches + PRs)**

---

## 🔮 Future Enhancements

- CI/CD pipeline (GitHub Actions) ← next step
- Role-based authorization (Admin/User roles)
- Pagination and filtering for listings
- MongoDB integration for flexible data models
- Improved frontend state management (NgRx / Signals)

---

## 📮 Contact

**Ricky Diaz**
📧 [tampacustoms@yahoo.com](mailto:tampacustoms@yahoo.com)
📱 813-352-4525
