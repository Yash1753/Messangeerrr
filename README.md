# Real-Time Chat Application - Messangeerrr

A modern, full-stack chat application built with the **MERN** stack, featuring real-time messaging, authentication, and online user presence. This project leverages powerful tools like **Socket.io** for live communication, **TailwindCSS** and **Daisy UI** for styling, and **Zustand** for simple yet effective state management.

---

## 🌟 Tech Stack

- **MongoDB** – NoSQL database for storing users and messages
- **Express.js** – Backend REST API and authentication routes
- **React.js** – Frontend UI with React Router for navigation
- **Node.js** – Server runtime environment
- **Socket.io** – Real-time bidirectional communication for messaging and online user status
- **TailwindCSS** & **Daisy UI** – Utility-first CSS framework and UI component library for sleek, responsive design
- **Zustand** – Lightweight global state management for React

---

## 🚀 Features

- **User Authentication & Authorization**  
  Secure sign-up, login, and logout flows with JWT-based authentication stored in HTTP-only cookies to protect against XSS attacks.

- **Real-Time Messaging**  
  Instant chat updates with Socket.io enabling seamless two-way communication between users without page refresh.

- **Online User Status**  
  Track which users are currently online and update status in real-time for improved social interaction.

- **Profile Management**  
  Update user profiles with profile pictures uploaded via Cloudinary.

- **Global State Management**  
  Efficient and minimal state management using Zustand to handle user authentication, messages, online users, and UI states.

- **Robust Error Handling**  
  Clear error messages and graceful failure handling on both client and server sides to improve user experience.

- **Responsive & Modern UI**  
  Built with TailwindCSS and Daisy UI to provide a clean, modern, and mobile-friendly interface.

---

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. Install backend dependencies and start the server:
  ```bash
 cd backend
npm install
npm run dev
```
3. Install frontend dependencies and start the React app:
   ```bash
   cd frontend
   npm install npm run dev
   ```
