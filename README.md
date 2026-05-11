# 🗞️ NewsMonkey

# 📰 NewsMonkey – MERN Stack News Application

### A Production-Grade MERN Stack News Application

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**Browse. Search. Bookmark. Stay Informed.**

---

</div>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Team](#team)

---

## Overview

**NewsMonkey** is a fully functional, full-stack news aggregation web application built using the **MERN stack** — MongoDB, Express.js, React.js, and Node.js. It was developed as a semester project for the Web Technologies course at the **National University of Computer and Emerging Sciences (FAST-NUCES), Islamabad — Spring 2026**.

The application fetches real-time news articles from the **NewsAPI** and presents them in a clean, responsive interface. Users can register an account, log in securely using **JWT authentication**, browse news by category, search for any topic, and bookmark articles to a personal reading list stored in **MongoDB Atlas**.

The project follows a clean separation of concerns — a React single-page application on the frontend communicates with a RESTful Express API on the backend, which in turn queries MongoDB through Mongoose. Authentication is handled via JSON Web Tokens with bcrypt password hashing, and protected API routes ensure private data remains secure.

---

## Features

### User Authentication
- Secure **Registration and Login** with JWT-based session management
- Passwords hashed using **bcrypt** before storage
- Protected routes — bookmark and profile features require authentication
- Persistent login state managed via **React Context API**

### News Browsing
- Browse top headlines across **7 categories** — General, Business, Entertainment, Health, Science, Sports, Technology
- **Infinite scroll** — articles load automatically as the user scrolls
- **Search** any topic using the navbar search bar with live results
- Source badge displayed on every article card
- Author name and publication date on every article

### Bookmarks
- Save any article to a personal **Bookmarks** collection (login required)
- All bookmarks stored securely in **MongoDB Atlas**, linked to the logged-in user
- View and manage all saved articles from a dedicated Bookmarks page
- Remove bookmarks at any time

### User Experience
- **Dark / Light mode** toggle with preference saved to localStorage
- **Toast notifications** for all user actions (save, delete, login, errors)
- Fully **responsive** design — works on desktop, tablet, and mobile
- Loading progress indicator while fetching articles
- Clean, professional newspaper-inspired UI

### Backend & Security
- RESTful API with **rate limiting** to prevent abuse
- **Input validation** on all POST routes using express-validator
- News API key kept server-side — never exposed to the frontend
- Compound index in MongoDB prevents duplicate article saves per user

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | UI component framework |
| Frontend | React Router v6 | Client-side page routing |
| Frontend | Axios | HTTP requests to backend API |
| Frontend | React Toastify | Toast notification system |
| Frontend | React Infinite Scroll | Auto-load more articles on scroll |
| Styling | Custom CSS | Styling and theming |
| Backend | Node.js | JavaScript runtime environment |
| Backend | Express.js 4 | RESTful API framework |
| Database | MongoDB Atlas | Cloud-hosted NoSQL database |
| Database | Mongoose ODM | Schema modeling and DB queries |
| Auth | jsonwebtoken (JWT) | Stateless authentication tokens |
| Auth | bcrypt.js | Password hashing and salting |
| Validation | express-validator | Server-side input validation |
| Dev Tools | nodemon | Auto-restart server on changes |
| Dev Tools | concurrently | Run frontend and backend together |
| External | NewsAPI | Real-time news article source |

---

## Project Structure

```
NewsApp-MERN/
│
├── backend/                        # Node.js + Express API server
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas connection
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, password, preferences)
│   │   └── SavedArticle.js         # Saved article schema with embedded comments
│   ├── routes/
│   │   ├── auth.js                 # POST /register, POST /login, GET /me, PUT /profile
│   │   ├── news.js                 # GET /top-headlines, GET /search
│   │   └── saved.js                # CRUD for bookmarks + comments
│   ├── .env                        # Environment variables (not committed to git)
│   ├── package.json
│   └── server.js                   # Express app entry point (port 5000)
│
├── frontend/                       # React.js single-page application
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── NavBar.js           # Navbar with links, search, auth, theme toggle
│       │   ├── News.js             # Category news feed with infinite scroll
│       │   ├── NewsItem.js         # Single article card with bookmark button
│       │   ├── Spinner.js          # Loading spinner component
│       │   ├── Login.js            # Login form with validation
│       │   ├── Register.js         # Registration form with validation
│       │   ├── SavedArticles.js    # Bookmarks page with remove functionality
│       │   ├── SearchResults.js    # Search results with infinite scroll
│       │   └── Profile.js          # User profile and preferences page
│       ├── context/
│       │   └── AuthContext.js      # Global auth state via React Context
│       ├── App.js                  # Root component — routing and layout
│       ├── App.css                 # Global styles and theme variables
│       └── index.js                # React DOM entry point
│
├── package.json                    # Root — runs both servers via concurrently
└── README.md
```

---

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** v16 or above — [Download here](https://nodejs.org)
- **npm** — comes with Node.js
- A **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/atlas)
- A **NewsAPI** key — [Get one free](https://newsapi.org)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/newsmonkey-mern.git
cd newsmonkey-mern
```

### Step 2 — Install Dependencies

Install all dependencies for root, backend, and frontend in one command:

```bash
npm run install-all
```

Or install them manually:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file inside the `backend/` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NEWS_API_KEY=your_newsapi_key
NODE_ENV=development
```

> See the [Environment Variables](#environment-variables) section below for details on how to obtain each value.

### Step 4 — Run the Application

From the root folder, run both servers simultaneously:

```bash
npm run dev
```

Or run them separately in two terminals:

```bash
# Terminal 1 — Backend API (port 5000)
cd backend
npm run dev

# Terminal 2 — React Frontend (port 3000)
cd frontend
npm start
```

### Step 5 — Open in Browser

| Service | URL |
|---|---|
| Frontend Application | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Health Check | http://localhost:5000/api/health |

---

## Environment Variables

| Variable | Description | How to Get |
|---|---|---|
| `PORT` | Port for the Express server | Set to `5000` |
| `MONGO_URI` | MongoDB connection string | Go to [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers → Copy string |
| `JWT_SECRET` | Secret key for signing JWT tokens | Use any long random string |
| `NEWS_API_KEY` | API key for fetching news | Register at [newsapi.org](https://newsapi.org) → Get API Key |
| `NODE_ENV` | Application environment | Set to `development` for local |

**MongoDB Atlas URI format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/newsmonkey?retryWrites=true&w=majority
```

> **Important:** Never commit your `.env` file to Git. It is already listed in `.gitignore`.

---

## API Reference

### Authentication — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Login and receive a JWT token | Public |
| `GET` | `/api/auth/me` | Get the currently logged-in user | Private |
| `PUT` | `/api/auth/profile` | Update user name and preferences | Private |

### News — `/api/news`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/news/top-headlines` | Fetch headlines by category | Public |
| `GET` | `/api/news/search` | Search articles by keyword | Public |

**Query Parameters for `/top-headlines`:** `country`, `category`, `page`, `pageSize`

**Query Parameters for `/search`:** `q`, `page`, `pageSize`, `sortBy`

### Saved Articles — `/api/saved`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/saved` | Get all bookmarked articles | Private |
| `POST` | `/api/saved` | Save an article to bookmarks | Private |
| `DELETE` | `/api/saved/:id` | Remove a saved article | Private |
| `POST` | `/api/saved/:id/comments` | Add a comment to a saved article | Private |
| `DELETE` | `/api/saved/:id/comments/:commentId` | Delete a comment | Private |

> **Private** routes require a valid JWT token in the `Authorization` header:
> ```
> Authorization: Bearer <your_token>
> ```

---

## Team

This project was developed as a semester project for the **Web Technologies** course at **FAST-NUCES Islamabad**, Spring 2026, Section **BCS-6B**.

| Student ID | Name |
|---|---|
| 23F-0785 | Minahil Riaz |
| 23F-0776 | Nawal Tariq |
| 23F-0627 | Muteeba Shahzad |

---

**National University of Computer and Emerging Sciences (FAST-NUCES)**

BCS-6B · Spring 2026 · Web Technologies

---

> **Note:** NewsAPI free tier is limited to `localhost` only. For production deployment, upgrade to a paid NewsAPI plan or switch to an alternative news source.