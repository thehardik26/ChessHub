# ♟️ ChessHub

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Django](https://img.shields.io/badge/Django-5.x-green?logo=django)
![DRF](https://img.shields.io/badge/Django_REST_Framework-red)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-02042B?logo=razorpay)

**A modern chess academy booking platform built with Django REST Framework and React.**

Book coaching sessions, purchase monthly passes, manage schedules, and make secure online payments.

</div>

---

# ✨ Features

## 👤 User Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- ✏️ Profile Management
- 📅 Interactive Booking Calendar
- ⏰ Time Slot Selection
- 💳 Secure Razorpay Payments
- 🎫 Monthly Membership Pass
- 📖 Booking History
- 🔄 Booking Reschedule
- ❌ Booking Cancellation

---

## 👨‍💼 Admin Features

- Dashboard
- Manage Users
- Manage Plans
- Manage Bookings
- Holiday Management
- Booking Statistics
- Session Pricing
- Monthly Pass Pricing

---

# 🚀 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- Django
- Django REST Framework
- Simple JWT
- Razorpay API

## Database

- PostgreSQL
- SQLite (Development)

## Deployment

- Render
- GitHub

---

# 📂 Project Structure

```
ChessHub/
│
├── backend/
│   ├── accounts/
│   ├── bookings/
│   ├── payments/
│   ├── plans/
│   ├── chesshub/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

> Add screenshots after uploading them.

| Home | Booking |
|------|----------|
| ![](screenshots/home.png) | ![](screenshots/booking.png) |

| Payment | Dashboard |
|---------|-----------|
| ![](screenshots/payment.png) | ![](screenshots/dashboard.png) |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/thehardik26/ChessHub.git
cd ChessHub
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside **backend**

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_database_url

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

EMAIL_HOST_USER=your_email

EMAIL_HOST_PASSWORD=your_password
```

---

# 🎯 Booking Workflow

```
User Login
      │
      ▼
Choose Plan
      │
      ▼
Select Date
      │
      ▼
Choose Time Slot
      │
      ▼
Monthly Pass?
   │        │
  Yes      No
   │        │
Book      Razorpay Payment
   │        │
   └────────┘
        ▼
 Booking Confirmed
```

---

# 💳 Payment

Integrated with **Razorpay**

- Secure Checkout
- Online Payment
- Monthly Pass Support
- Session Booking

---

# 🔒 Authentication

- JWT Access Token
- Refresh Token
- Protected Routes
- User Authorization

---

# 🌟 Future Improvements

- Email Notifications
- Google Login
- Attendance Tracking
- Player Ratings
- Coach Availability
- Tournament Management
- Mobile Application
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

### Hardik Pamale

**B.Sc. Information Technology**

GitHub

https://github.com/thehardik26

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork it

📢 Share it

---

<div align="center">

### ♟️ ChessHub

**Learn • Play • Improve**

Made with ❤️ using Django & React

</div>
