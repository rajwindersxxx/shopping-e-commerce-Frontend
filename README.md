---

# 🛒 E-Commerce Frontend

A **modern frontend application** for an **e-commerce platform**, built with **React**, **TypeScript**, **Tailwind CSS**, and **React Query**.

This app allows **users to browse products, place orders**, and **track their orders**, while **admins can manage products and orders**. The frontend communicates with a **Node.js/Express backend API**.


## 🛠 Tech Stack

### **Frontend**

* **React** – Component-based UI
* **TypeScript** – Type safety across the app
* **React Router** – Page routing
* **React Query** – Server state management & caching
* **React Hook Form** – Form handling & validation
* **Tailwind CSS** – Rapid styling & responsive design

### **Dev Tools**

* **Vite** – Fast dev server and build tool
* **ESLint + Prettier** – Linting and formatting
* **Jest + React Testing Library** – Component testing (optional)

---

## 📂 Project Structure

```bash
client/
└── src/
    ├── api/          # API service functions (Axios)
    ├── assets/       # Images, icons, logos
    ├── components/   # Reusable UI components (cards, forms, modals)
    ├── config/       # API configs & constants
    ├── context/      # React context providers
    ├── helper/       # Utility functions
    ├── hooks/        # Custom React hooks
    ├── pages/        # Route-level pages (Home, Product, Cart, Admin)
    ├── types/        # TypeScript type definitions
    ├── app.tsx       # Main App component
    ├── index.css     # Global styles
    └── main.tsx      # App entry point
```

---

## ⚙️ Setup Instructions

### **System Requirements**

- Node.js v22+
- NPM or Yarn

---

### **Manual Setup**

1. Clone the repository:

```bash
git clone https://github.com/rajwindersxxx/intershipAssigment-frontend.git
cd intershipAssigment-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure `.env` if endpoint is different

```.env
VITE_API_END_POINT="http://localhost:4000/api/v1";
// Update if backend runs on a different port
```

4. Start development server:

```bash
npm run dev
```

- Access the app → [http://localhost:5173](http://localhost:5173)

---

## 📜 Features

### **User Features**

- Browse products by category or search
- View product details and images
- Add products to cart
- Place orders and view order history
- Authentication (login & signup) via backend JWT

### **Admin Features**

- Create, update, or delete products
  <!-- * View all orders -->
  <!-- * Update order status (Pending → Shipped → Delivered) -->
- Role-based access control

### **Shared Features**

- Responsive UI with **Tailwind CSS**
- Client-side routing via **React Router**
- Server state management with **React Query**
- Forms handled and validated using **React Hook Form**

---

## 📜 API Documentation

The frontend interacts with the backend API documented here:
[**View API Docs in Postman**](https://documenter.getpostman.com/view/36192494/2sB3BHkonF)

---
