# Newtome 🛒

Newtome is a full-stack web application designed to support user accounts, listings, and catalog management with secure authentication and scalable backend architecture.

This project highlights advanced backend development concepts using Spring Boot, including JWT-based security, layered architecture, and modular domain design.

---

## 🔧 Tech Stack

- **Frontend:** Angular (Standalone Components, Routing, Services)
- **Backend:** Java, Spring Boot (REST API)
- **Security:** JWT Authentication (custom filter + token service)
- **Database:** MySQL (designed for scalability, MongoDB integration planned)
- **Tools:** Postman, Git, IntelliJ, VS Code

---

## 🧱 Architecture Overview

The backend is built using a **layered architecture** to ensure maintainability and scalability:

- **Controller Layer** → Handles HTTP requests and responses
- **Service Layer** → Contains business logic
- **Repository Layer** → Manages database interactions
- **DTOs & Mappers** → Separates internal models from API contracts

### 📂 Core Modules

- **Users** → Authentication, account management
- **Catalog** → Item/listing structure and organization
- **Uploads** → File handling via REST endpoints
- **Security** → JWT authentication and request filtering

---

## 🔐 Security Implementation

- Implemented **JWT-based authentication** using:
  - Custom `JwtAuthFilter`
  - Token generation and validation service

- Secured API endpoints to ensure only authenticated users can access protected resources
- Configured CORS for safe frontend-backend communication

---

## 📦 Features

- User registration and authentication system
- Secure login with token-based authorization
- RESTful APIs for managing listings and catalog data
- File upload functionality via backend endpoints
- Modular backend structure for easy feature expansion
- Frontend integration with Angular services and HTTP client

---

<<<<<<< HEAD
=======
## 💰 Offer System

- Implemented an offer-based marketplace system
- Users can submit offers on listings
- Sellers can review incoming offers and choose to accept or reject
- Designed backend logic to handle offer state transitions and user interactions
- Enables real-world buyer/seller workflow beyond basic CRUD operations

---

>>>>>>> develop
## 🚀 Key Learning Outcomes

- Designed and implemented secure REST APIs using Spring Boot
- Applied **JWT authentication and request filtering**
- Structured backend using **industry-standard architecture patterns**
- Built scalable and modular backend systems
- Integrated frontend and backend with real-time data exchange

---

## 🔮 Future Enhancements

- Role-based authorization (Admin/User roles)
- Pagination and filtering for listings
- Dockerized deployment for backend and database
- MongoDB integration for flexible data models
- Improved UI/UX and state management on frontend

---

## 📮 Contact

Created by Ricky Diaz
<<<<<<< HEAD
tampacustoms@yahoo.com
813-352-4525
=======
>>>>>>> develop
