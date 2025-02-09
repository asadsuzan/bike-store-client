# Bike Store Client 🚴‍♂️

A fully functional e-commerce web application for purchasing and managing bike products, built using modern web technologies.

## 🌐 Live Demo
[Visit the Live Site](https://bikebd-client.vercel.app/)

🔗 **Backend Repository**  
[View Backend Repository](https://github.com/asadsuzan/bike-store-api)
---

## 🚀 Features
- **Public Pages**
    - Home
    - Shop
    - Product Details
    - Cart
    - About

- **Authentication & Authorization**
    - Login and Registration
    - Secure Routes for Admin and User dashboards

- **User Dashboard**
    - Order History
    - Profile Management

- **Admin Dashboard**
    - Insert Products
    - Manage Inventory
    - Manage Orders
    - Edit Product Information

- **Additional Functionalities**
    - Smooth Page Scroll
    - Persistent Store with Redux Persist
    - Notifications using Sonner
    - Responsive Layout

---

## 📁 Project Structure

---

## ⚙️ Available Routes
| Route               | Description                  | Access      |
| ------------------- | ----------------------------- | ----------- |
| `/`                 | Home Page                     | Public      |
| `/shop`             | Shop Page                     | Public      |
| `/cart`             | Cart Page                     | Public      |
| `/about`            | About Page                    | Public      |
| `/product/:id`      | Product Details               | Public      |
| `/login`            | Login                         | Public      |
| `/register`         | Register                      | Public      |
| `/dashboard`        |  Dashboard                | Protected   |
| `/orders`           | Order Management              | Protected   |
| `/insert-product`   | Add New Product               | Admin Only  |
| `/edit-product/:id` | Edit Product Details          | Admin Only  |
| `/inventory`        | Product Inventory Management  | Admin Only  |
| `/profile`          | User Profile                  | Protected   |
| `/order/verify-order`| Verify Order                 | Authenticated|

---

## 📦 Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **State Management:** Redux Toolkit, Redux Persist
- **Routing:** React Router
- **UI Components:** Framer Motion, Lucide Icons, Mantine RTE
- **Charts:** Recharts
- **Form Handling:** React Hook Form
- **Notifications:** Sonner

---

## 🚀 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url
   cd bike-store-client
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev

4. Build the project for production:
   ```bash
   npm run build
5. Preview the production build:
   ```bash
   npm run preview

🛠️ **Scripts**
- `npm run dev`: Starts the development server
- `npm run build`: Builds the project for production
- `npm run lint`: Lints the codebase
- `npm run preview`: Previews the production build

🛡️ **Security**
- JWT for user authentication
- Role-based access for Admin functionalities
---
## 🔗Deployment 
[Live Link](https://bikebd-client.vercel.app/)
## 🔗 Backend Repository

[View on GitHub](https://github.com/asadsuzan/bike-store-api)

---
## 🤝 Contributions

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

## 🧑 Author

Developed by **MD Asaduzzaman Suzan**



