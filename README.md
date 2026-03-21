# Newtome 🛒

[Live App](https://dxsg03couz5uo.cloudfront.net)

Newtome is a full-stack marketplace application with an Angular frontend designed to interact with a secure Spring Boot backend. The application emphasizes **modular UI design, API integration, and real-world data workflows**, aligning with enterprise software development practices.

---

## 🔧 Tech Stack

### Frontend

- Angular (Standalone Components, Routing, Services)
- TypeScript
- RxJS (HTTP requests, reactive programming)

### Backend Integration

- REST APIs (Spring Boot)
- JWT Authentication

### Tools

- Git / GitHub
- VS Code / IntelliJ
- Postman

---

## 🧱 Frontend Architecture

The UI follows a **component-based and service-driven architecture**, similar to enterprise frontend systems:

- **Components** → Encapsulated UI logic and rendering
- **Services** → Centralized API communication and business logic
- **Models/Interfaces** → Strong typing for structured data handling
- **Routing** → Organized navigation and page flow

This structure supports **scalability, maintainability, and clear separation of concerns**.

---

## 🔐 Authentication & API Integration

- Implemented **JWT-based authentication flow**
- Attached tokens to HTTP requests for secure API access
- Protected routes to restrict unauthorized access
- Handled asynchronous API calls using Angular services and RxJS

---

## 📦 Features

- User registration and login interface
- Secure authentication with token handling
- Dynamic listing display from backend APIs
- Offer submission and interaction workflows
- Image upload and preview functionality
- Responsive UI for desktop and mobile devices

---

## 💰 Offer Workflow (UI Integration)

- Users can submit offers on listings through the UI
- Sellers can review and respond to offers
- UI reflects backend-driven state changes (pending, accepted, rejected)
- Demonstrates handling of **stateful interactions beyond basic CRUD**

---

## ☁️ Deployment

- Frontend hosted on AWS S3 (static hosting)
- Distributed globally using AWS CloudFront (CDN)
- Integrated with backend API through CloudFront routing

---

## 🧩 System Integration

Angular Frontend → CloudFront → Spring Boot API (EC2)
→ MySQL (Docker)
→ S3 (image storage)

---

## 🚀 Key Engineering Takeaways

- Developed a **modular Angular application** using reusable components and services
- Integrated frontend with REST APIs using **asynchronous data handling (RxJS)**
- Implemented **secure authentication workflows (JWT)**
- Designed UI to align with backend business logic and data models
- Deployed a production-ready frontend using **AWS cloud infrastructure**

---

## 🔮 Future Enhancements

- State management (NgRx / Signals)
- Advanced filtering and search capabilities
- Role-based UI rendering (Admin/User)
- Improved error handling and loading states
- Enhanced mobile-first design

---

## 📮 Contact

Ricky Diaz
[tampacustoms@yahoo.com](mailto:tampacustoms@yahoo.com)
813-352-4525
