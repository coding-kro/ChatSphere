# 💬 ChatSphere

<div align="center">

### 🚀 Real-Time MERN Chat Application

Instant messaging platform built with **React, Node.js, Express, MongoDB, and Socket.io**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge\&logo=socket.io)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge\&logo=render)

</div>

---

## 🌟 Overview

ChatSphere is a modern real-time chat application that allows users to communicate instantly through private conversations. It features secure authentication, online user tracking, typing indicators, persistent message storage, and a responsive user interface.

---

## 🔗 Live Demo

🌐 **Frontend:** https://chat-sphere-theta-neon.vercel.app

⚙️ **Backend:** https://chatsphere-od2e.onrender.com

---

## ✨ Features

### 🔐 Authentication

* ✅ User Registration
* ✅ Secure Login System
* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ Password Hashing with bcrypt

### 💬 Real-Time Messaging

* ⚡ Instant Message Delivery
* 📩 Private One-to-One Chats
* 🗂️ Persistent Chat History
* 🔄 Live Message Updates

### 🟢 Presence System

* 🟢 Online Status
* ⚫ Offline Status
* 🔄 Real-Time User Tracking

### ⌨️ Typing Indicators

* 💭 See when users are typing
* 🚀 Instant updates using Socket.io

### 📱 Responsive Design

* 📱 Mobile Friendly
* 💻 Desktop Optimized
* 📟 Tablet Responsive

---

## 🛠️ Tech Stack

| Category          | Technologies                                |
| ----------------- | ------------------------------------------- |
| 🎨 Frontend       | React.js, Tailwind CSS, Axios, React Router |
| ⚙️ Backend        | Node.js, Express.js, Socket.io              |
| 🗄️ Database       | MongoDB Atlas, Mongoose                     |
| 🔐 Authentication | JWT, bcryptjs                               |
| ☁️ Deployment     | Vercel, Render                              |

---

## 📂 Project Structure

```bash
ChatSphere
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layout
│   │   ├── pages
│   │   └── utils
│   │
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── db
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── socket
│   │   └── utils
│   │
│   └── package.json
│
└── README.md
```

### 🎨 Frontend Structure

| Folder       | Description                                     |
| ------------ | ----------------------------------------------- |
| `assets`     | Images, icons, and static resources             |
| `components` | Reusable UI components                          |
| `context`    | Global state management using React Context API |
| `layout`     | Shared layouts and page wrappers                |
| `pages`      | Application pages/screens                       |
| `utils`      | Helper functions and utilities                  |

### ⚙️ Backend Structure

| Folder        | Description                             |
| ------------- | --------------------------------------- |
| `config`      | Application configuration files         |
| `db`          | MongoDB connection setup                |
| `controllers` | Request handling and business logic     |
| `middleware`  | Authentication and custom middleware    |
| `models`      | MongoDB/Mongoose schemas                |
| `routes`      | API route definitions                   |
| `socket`      | Socket.io real-time communication logic |
| `utils`       | Reusable helper functions               |

```
```


## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/coding-kro/ChatSphere
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```env
PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
CHATSPHERE_URL=http://localhost:5173
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env`

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## ⚡ Real-Time Features Architecture

```text
User A
   │
   ▼
Socket.io Server
   │
   ▼
User B

Instant Delivery ⚡
Typing Indicator ⌨️
Online Status 🟢
```

---

## 📸 Screenshots

### 🔑 Login Page

<img width="1918" height="932" alt="lohin" src="https://github.com/user-attachments/assets/af433091-5ce6-4f2b-a472-e5dcc347ce9a" />

### 📝 Signup Page

<img width="1918" height="920" alt="signup" src="https://github.com/user-attachments/assets/ae4e917c-f775-4bd1-97f8-598a14c8c07a" />


### 💬 Chat Interface

<img width="1916" height="928" alt="maindashboard" src="https://github.com/user-attachments/assets/20fdcd4c-0546-453e-90e6-e12e94a034b6" />

### 📱 Mobile View

<img width="3614" height="1844" alt="iPhone-13-PRO-chat-sphere-theta-neon vercel app (1)" src="https://github.com/user-attachments/assets/851ec902-ab39-4154-a86c-0b3f7badbac2" />

---

## 🎯 Key Learning Outcomes

✅ JWT Authentication

✅ Socket.io Real-Time Communication

✅ MongoDB Data Modeling

✅ React State Management

✅ Production Deployment

✅ CORS Handling

✅ Full-Stack MERN Development

---

## 🔮 Future Enhancements

* 📷 Image Sharing
* 📁 File Sharing
* 👥 Group Chats
* ✅ Read Receipts
* 😀 Message Reactions
* 🔔 Push Notifications
* 🔍 Message Search
* 👤 Profile Customization

---

## 👨‍💻 Developer

### Mohit Kumar

💼 MERN Stack Developer

🔗 LinkedIn: https://www.linkedin.com/in/mohit-kumar16

---

<div align="center">

### ⭐ If you like this project, consider starring the repository!

🚀 Built with passion using the MERN Stack

</div>
