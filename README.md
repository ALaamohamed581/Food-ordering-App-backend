# Food Ordering App

A robust food ordering backend application built with **NestJS**, offering seamless features like authentication, user and restaurant management, payment processing, file uploads, and real-time communication.

Explore the API Docs: [Food Ordering App API](https://food-ordering-app-backend-z842.onrender.com/api/v1)

---

## **Key Features**

### 1. **Authentication**
- Dedicated authentication flows for **admin** and **user** roles.
- Secure **JWT-based authorization**.

### 2. **Role-Based Access Control**
- Role-specific permissions enforced using **NestJS guards**.

### 3. **User & Admin Management**
- CRUD operations for managing users and admin roles effectively.

### 4. **Restaurant Management**
- Comprehensive features to add, update, or delete restaurant profiles.

### 5. **Menu Management**
- Full control over menu items with options to create, update, or delete items.

### 6. **File Uploads**
- Smooth image uploads integrated with **Cloudinary**.

### 7. **Payment Integration**
- Secure and reliable payment handling with **Stripe** and **PayPal**.

### 8. **Real-Time Chat**
- **WebSocket-powered live chat** for users to connect with customer support or restaurant staff.
- Includes a dedicated **Chats Module** to manage conversations and history.

### 9. **API Documentation**
- Detailed API documentation available at [Food Ordering App API](https://food-ordering-app-backend-z842.onrender.com/api/v1).

---

## **Getting Started**

### **Prerequisites**
Ensure the following are installed:
- **Node.js** (v14+)
- **npm** (v6+)
- **MongoDB** (Running instance with a valid connection URL in `.env`).

---

### **Setup Instructions**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**  
   Create a `.env` file in the root directory with the following variables:

   ```env
   MONGO_URL=
   ADMIN_REFRESH_TOKEN_SECRET=
   ADMIN_AUTH_TOKEN_SECRET=
   COOKIE_SECRET=
   USER_REFRESH_TOKEN_SECRET=
   USER_AUTH_TOKEN_SECRET=
   EMAIL_USERNAME=
   EMAIL_PASSWORD=
   EMAIL_HOST=
   EMAIL_PORT=
   CLOUDINARY_CLOUD_KEY=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_CLOUD_SECRET=
   STRIPE_API_KEY=
   PAYPAL_CLIENT_ID=
   PAYPAL_CLIENT_SECRET=
   ```

4. **Run the Application**
   Start the server in development mode:
   ```bash
   npm run start:dev
   ```



---

## **Features in Detail**

- **Secure Authentication:** Separate login flows for admins and users with token-based security.
- **Fine-Grained Access Control:** Guard-based permission management for better security.
- **Restaurant & Menu Management:** Easy-to-use modules for managing restaurants and their menus.
- **Integrated Payment Processing:** Utilize **Stripe** and **PayPal** for handling transactions.
- **Efficient File Management:** Image uploads and storage powered by **Cloudinary**.
- **Live Chat:** Real-time WebSocket-based communication to enhance user interaction.
- **Persistent Chat History:** Store and retrieve chat logs for better customer support.

---

This application is built to simplify the backend management of food ordering platforms, ensuring scalability, security, and user-friendliness. Start building and customizing your food ordering service today!
