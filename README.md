# Newtome 🛒

Newtome is a full-stack web application designed to support user accounts, listings, and catalog management with secure authentication and scalable backend architecture.

It highlights advanced backend development concepts using Spring Boot, including JWT-based security, layered architecture, and modular domain design.

---

## 🔧 Tech Stack

- **Frontend:** Angular (Standalone Components, Routing, Services)
- **Backend:** Java, Spring Boot (REST API)
- **Security:** JWT Authentication (custom filter + token service)
- **Database:** MySQL _(MongoDB integration planned)_
- **Tools:** Postman, Git, IntelliJ, VS Code

---

## 🧱 Architecture Overview

The backend follows a **layered architecture** to ensure maintainability and scalability:

- **Controller Layer** → Handles HTTP requests and responses
- **Service Layer** → Contains business logic
- **Repository Layer** → Manages database interactions
- **DTOs & Mappers** → Separates internal models from API contracts

### 📂 Core Modules

- **Users** → Authentication and account management
- **Catalog** → Listing structure and organization
- **Uploads** → File handling via REST endpoints
- **Security** → JWT authentication and request filtering

---

## 🔐 Security Implementation

- Implemented **JWT-based authentication** using:
  - Custom `JwtAuthFilter`
  - Token generation and validation service

- Secured API endpoints so only authenticated users can access protected resources
- Configured CORS for safe frontend-backend communication

---

## 📦 Features

- User registration and authentication
- Secure login with token-based authorization
- RESTful APIs for listings and catalog management
- File upload functionality via backend endpoints
- Modular backend structure for scalability
- Angular frontend integration using HTTP services

---

<<<<<<< HEAD
=======
## 💰 Offer System

A key feature of Newtome is its **offer-based marketplace workflow**:

- Users can submit offers on listings
- Sellers can review and **accept or reject offers**
- Backend handles **offer state transitions** and user interactions
- Implements real-world buyer/seller logic beyond basic CRUD

---

>>>>>>> develop
## 🚀 Key Learning Outcomes

- Designed and implemented secure REST APIs using Spring Boot
- Applied **JWT authentication and request filtering**
- Built scalable backend systems using **layered architecture**
- Integrated frontend and backend with real-time data flow

---

## 🔮 Future Enhancements

- Role-based authorization (Admin/User roles)
- Pagination and filtering for listings
- Dockerized deployment for backend and database
- MongoDB integration for flexible data models
- Improved UI/UX and frontend state management

---

## 📮 Contact

<<<<<<< HEAD
Created by Ricky Diaz
<<<<<<< HEAD
tampacustoms@yahoo.com
813-352-4525
=======
>>>>>>> develop
=======
**Ricky Diaz**
📧 [tampacustoms@yahoo.com](mailto:tampacustoms@yahoo.com)
📱 813-352-4525
>>>>>>> develop
