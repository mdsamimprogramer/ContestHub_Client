# 🏆 ContestHub

**ContestHub** is a modern, fully responsive web application for managing creative contests. Users can create, discover, participate in, and manage contests in various categories like design, writing, gaming reviews, and more. The platform supports three user roles (Admin, Contest Creator, Normal User), secure authentication, payment integration, and dynamic dashboards.

---

## 🌐 Live Site
[Visit ContestHub](https://contests-hub.netlify.app/)

---

## 👤 Demo Accounts

| Role      | Email                | Password      |
|----------|--------------------|--------------|
| Admin     | admin1@gmail.com.com    | Samim123    |
| Creator   | creator@gmail.com.com  | Samim123  |
| User      | user@example.com     | User.....  |

---

## 📌 Features

### General Features
- Fully responsive design (mobile, tablet, desktop)  
- Secure authentication using Firebase  
- Role-based dashboards: Admin, Creator, and User  
- Payment integration with Stripe  
- Smooth UI with Tailwind CSS  
- Sweet Alert notifications for all CRUD actions  
- Dynamic search and filtering by contest types  
- Winner announcement and recent winners section  
- Submit tasks after contest registration  
- Dark/Light mode toggle saved in localStorage  

### Admin Dashboard
- Approve, reject, and delete contests  
- Manage users and change roles (User ↔ Creator ↔ Admin)  
- View platform statistics: total users, creators, contests, earnings  

### Creator Dashboard
- Add new contests with detailed forms  
- Edit or delete pending contests  
- View submissions and declare winners  
- Track created contests and status  

### User Dashboard
- View participated contests and payment status  
- View won contests and prizes  
- Update profile information (name, photo, bio)  
- Track win percentage with charts  

### Extra Features
- Leaderboard showing top users by contest wins  
- Pagination (10 items per page) on tables  
- Two extra meaningful pages (configurable)  
- Nice animations and interactive UI  

---

## 🛠 Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, React Query, React Hook Form  
**Backend:** Node.js, Express.js, MongoDB, Firebase Auth  
**Payment:** Stripe API  
**Deployment:** Vercel / Netlify (Frontend), Vercel (Backend)  

---

## 🚀 Installation

### Backend
```bash
cd server
npm install
cp .env.example .env  # Add your environment variables
npm run dev
