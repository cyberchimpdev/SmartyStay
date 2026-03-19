# 🏨 SmartStay – Hotel Management System

### +2 Final Year Project

SmartStay is a full-stack Hotel Management System developed as a +2 Final Year Project.
It is designed to help hotels manage rooms, bookings, and customers efficiently through a modern web-based platform.

---

# 🎓 Academic Information

- **Project Title:** SmartStay – Hotel Management System
- **Project Type:** +2 Final Year Project
- **Technology Stack:** Django + React (Vite)
- **Project Category:** Web-Based Management System
- **Academic Level:** Higher Secondary (+2)

---

# 📌 Project Objective

The main objective of SmartStay is to:

- Digitize hotel room management
- Provide an online booking platform
- Implement secure user authentication
- Create role-based dashboards
- Prevent booking conflicts through backend validation
- Provide an intuitive and modern UI for both guests and administrators

---

# 🧠 Problem Statement

Many small and mid-level hotels:

- Manage bookings manually
- Use paper registers or spreadsheets
- Lack proper online booking systems
- Have no automated availability validation

This project solves these problems by creating a centralized digital system.

---

# 🏗 Technology Stack

## Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Context API
- Axios
- Framer Motion (UI animations)

## Backend

- Django
- Django REST Framework
- SimpleJWT (JWT Authentication)
- Jazzmin (Enhanced Admin Panel)
- Pillow (Image Upload Support)
- SQLite Database (Development)

---

# 📁 Project Structure

---

## 🐍 Backend Structure

```bash
backend/
│
├── hotel_backend/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── accounts/
├── rooms/
├── bookings/
│
├── media/
├── manage.py
└── requirements.txt
```

---

## ⚛ Frontend Structure

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── context/
│   ├── components/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── admin/
│   │
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tailwind.config.js
├── postcss.config.cjs
├── vite.config.js
└── package.json
```

---

# 🔐 Key Features

## 👤 Customer Features

- User registration & login
- Browse available rooms
- View room details with images
- Submit booking requests
- View booking history
- Track booking status (Pending / Approved / Cancelled)

---

## 🛠 Admin Features

- Secure admin login
- Create, edit, delete rooms
- Upload room images
- Approve or cancel bookings
- Manage customer data
- Enhanced Django Admin panel using Jazzmin

---

# 📅 Booking Validation Logic

The system prevents:

- Invalid check-in / check-out dates
- Overlapping bookings
- Unauthorized booking modifications

Only:

- Pending and Approved bookings block availability

---

# 🎨 UI Design

- Modern glassmorphism theme
- Fully responsive layout
- Mobile-friendly interface
- Smooth transitions and animations

---

# ⚙ Backend Setup Instructions

## 1️⃣ Create Virtual Environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

---

## 2️⃣ Install Required Packages

```bash
pip install django djangorestframework djangorestframework-simplejwt pillow django-cors-headers jazzmin
```

---

## 3️⃣ Apply Migrations

```bash
python manage.py migrate
```

---

## 4️⃣ Create Superuser

```bash
python manage.py createsuperuser
```

---

## 5️⃣ Run Backend Server

```bash
python manage.py runserver 8000
```

Backend URL:

```
http://127.0.0.1:8000
```

Backend API URL:

```
http://127.0.0.1:8000/api/
```

Admin Panel:

```
http://127.0.0.1:8000/admin/
```

---

# ⚛ Frontend Setup Instructions

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Run Frontend Server

```bash
npm run dev -- --host
```

Frontend URL:

```
http://localhost:5173
```

---

# 🌐 Public Access Using Ngrok (Project Demo)

SmartStay can be accessed publicly using **ngrok**, which exposes the local development server to the internet.

This allows instructors or evaluators to test the project remotely.

---

# ⚙ How It Works

```
User
 ↓
Ngrok Public URL
 ↓
React Frontend (Vite – Port 5173)
 ↓
Vite Proxy
 ↓
Django Backend API (Port 8000)
```

The frontend communicates with Django automatically through a Vite proxy.

---

# 🚀 Running the Full Project with Ngrok

Open **three terminals**.

---

## 1️⃣ Start Backend

```bash
cd backend
python manage.py runserver 8000
```

---

## 2️⃣ Start Frontend

```bash
cd frontend
npm run dev -- --host
```

---

## 3️⃣ Start Ngrok

```bash
ngrok http 5173
```

Example output:

```
Forwarding https://abcd1234.ngrok-free.app -> http://localhost:5173
```

---

# 🔗 Public Project URL

Anyone can access the project using the ngrok link:

```
https://abcd1234.ngrok-free.app
```

Users can:

- Browse rooms
- Register accounts
- Login
- Book rooms
- View booking history

---

# 🔄 API Endpoints

Authentication:

```http
POST /api/token/
POST /api/token/refresh/
```

Rooms:

```http
GET /api/rooms/
POST /api/rooms/
DELETE /api/rooms/{id}/
```

Bookings:

```http
GET /api/bookings/
POST /api/bookings/
PATCH /api/bookings/{id}/
```

---

# 📸 Media Handling

Room images are stored inside:

```
backend/media/rooms/
```

---

# 🎯 Learning Outcomes

Through this project, I learned:

- Full-stack web development
- REST API creation
- JWT authentication implementation
- Role-based authorization
- Database modeling
- Image upload handling
- React component architecture
- State management using Context API
- Responsive UI design using Tailwind CSS
- Real-world project structuring

---

# 🚀 Future Enhancements

- Online payment integration
- Revenue analytics dashboard
- Email notification system
- Multi-hotel management
- Calendar-based booking view
- Deployment to production server

---

# 📜 Conclusion

SmartStay successfully demonstrates the implementation of a modern web-based Hotel Management System using Django and React.

This project showcases:

- Backend API development
- Frontend UI design
- Authentication & security
- Database management
- Full-stack integration

---

# 👨‍🎓 Student Information

- **Name:** Asim Pun Magar
- **Class:** +2 (SM-45)
- **Faculty:** Science
- **Institution:** Xavier International College
- **Supervisor:** Yogesh Luitel

---

# 📌 Project Status

✅ Fully Functional (Local Development)
✅ Role-Based Authentication
✅ Room Management
✅ Booking Validation
✅ Modern UI
✅ Jazzmin Admin Integration

---

**SmartStay – A Complete Hotel Management Solution Built as a +2 Final Year Project**
