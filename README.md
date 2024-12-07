Here's an updated version of your **Food Ordering App** README with the additional features for live chat and a chat module included:

---

# Food Ordering App

A streamlined food ordering application built with **NestJS**, featuring authentication, user management, restaurant and menu handling, payment integration, file uploads, and live chat.

## Key Features

### 1. **Authentication**

- Separate authentication for **admin** and **users**.
- **JWT** tokens for secure authorization.

### 2. **Role-Based Access Control**

- Permissions managed through **guards** for secure, role-specific access.

### 3. **Restaurant Management**

- Add, update, and manage restaurants.

### 4. **Menu Management**

- Create, update, and delete menu items.

### 5. **File Uploads**

- Upload images seamlessly using **Cloudinary**.

### 6. **Payment Integration**

- Integrated with **Stripe** and **PayPal** for secure payment processing.

### 7. **Real-Time Chat**

- **WebSocket-based** live chat functionality for users to communicate directly with customer support or restaurant staff.
- **Chats Module** for managing chat sessions, message history, and user interactions.

### 8. **API Documentation**

- Access detailed **Swagger API Documentation** at [http://localhost:8000/api/v1](http://localhost:8000/api/v1).

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **MongoDB** (Ensure MongoDB is running and `.env` has a valid connection URL).

### Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Add Environment Variables**  
   Create a `.env` file in the root directory with the following variables:

   ```plaintext
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
   CHAT_SECRET_KEY=
   SOCKET_PORT=
   ```

4. **Run the Application**  
   Start the application in development mode:

   ```bash
   npm run start:dev
   ```

5. **Access API Documentation**  
   Open [http://localhost:8000/api/v1](http://localhost:8000/api/v1) in your browser.

---

## Highlights

- **Authentication:** Secure JWT-based authentication for users and admins.
- **User Management:** CRUD operations for managing user data.
- **Restaurant Module:** Streamlined operations for managing restaurant data.
- **Menu Items:** Easy addition and management of menu items.
- **Role-Based Permissions:** Fine-grained access control for different user roles.
- **Payment Integration:** Handle payments using Stripe or PayPal.
- **Cloudinary Integration:** Efficient image uploads.
- **Real-Time Chat:** Users can engage in live chat with support or staff for assistance.
- **Chat Management:** Persistent chat history and efficient session handling.

---
