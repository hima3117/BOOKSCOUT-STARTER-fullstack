# 📚 BookScout - Book Discovery & Favorites Platform

BookScout is a full-stack book discovery web application that allows users to search, explore, and save their favorite books. The application provides a clean and responsive interface where readers can discover books by title, author, and subject using the OpenLibrary API.

Users can create an account, log in securely, save favorite books, view saved collections, and manage their reading preferences.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT based authentication
- Protected user features

### 📖 Book Discovery
- Search books by:
  - Title
  - Author
  - Topic
- Browse books by subjects
- Book details page
- OpenLibrary API integration

### ⭐ Favorites Management
- Save books to favorites
- Remove saved books
- Favorites stored permanently in MongoDB
- Personal favorites collection for each user

### 👤 User Profile
- View user information
- Display email details
- Track number of saved books

### 🎨 UI Features
- Fully responsive design
- Mobile friendly navigation
- Loading states
- Error handling
- Empty states
- Toast notifications

### 🔍 Sorting & Pagination
- Pagination support
- Sort books by:
  - Relevance
  - Newest
  - Oldest

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MongoDB
- Mongoose

### External API
- OpenLibrary API

---

## 📂 Project Structure

```
BookScout
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   └── utils
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
https://github.com/hima3117/BOOKSCOUT-STARTER-fullstack.git
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

Run backend:

```bash
npm run dev
```

Backend will start at:

```
http://localhost:5000
```

---

# 🔑 API Modules

## Authentication

### Register User

```
POST /api/auth/register
```

### Login User

```
POST /api/auth/login
```

---

## Books

### Search Books

```
GET /api/books/search
```

Features:
- Search query
- Subject search
- Pagination

---

## Favorites

### Add Favorite

```
POST /api/favorites
```

### Get Favorites

```
GET /api/favorites
```

### Remove Favorite

```
DELETE /api/favorites/:id
```

---

# 📸 Screenshots

Add screenshots here:

- Home Page
- Search Results
- Book Details
- Login/Register
- Favorites Page
- Profile Page

---

# 🎯 Future Enhancements

- Reading progress tracking
- User reviews and ratings
- Personalized recommendations
- Dark mode
- Social sharing
- Reading lists

---

# 👩‍💻 Author

**Himanshi**

Full Stack Developer

---

# 📄 License

This project is developed for educational and portfolio purposes.
