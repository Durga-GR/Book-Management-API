# 📚 Books REST API

A simple in-memory REST API built with **Node.js** and **Express** to manage a list of books.

---

## 🚀 Setup & Run

```bash
# 1. Navigate into the project folder
cd books-api

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# (Optional) Start with auto-reload on file changes
npm run dev
```

Server runs at → **http://localhost:3000**

---

## 📡 API Endpoints

| Method   | Endpoint       | Description          |
|----------|----------------|----------------------|
| `GET`    | `/books`       | Get all books        |
| `GET`    | `/books/:id`   | Get a book by ID     |
| `POST`   | `/books`       | Add a new book       |
| `PUT`    | `/books/:id`   | Update a book by ID  |
| `DELETE` | `/books/:id`   | Delete a book by ID  |

---

## 🧪 Postman Testing Guide

### 1. GET all books
- **Method:** `GET`
- **URL:** `http://localhost:3000/books`

---

### 2. GET a single book
- **Method:** `GET`
- **URL:** `http://localhost:3000/books/1`

---

### 3. POST — Add a new book
- **Method:** `POST`
- **URL:** `http://localhost:3000/books`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho"
}
```

---

### 4. PUT — Update a book
- **Method:** `PUT`
- **URL:** `http://localhost:3000/books/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald"
}
```

---

### 5. DELETE — Remove a book
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/books/2`

---

## 📦 Sample Response Format

**Success:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee" },
    { "id": 3, "title": "1984", "author": "George Orwell" }
  ]
}
```

**Error:**
```json
{
  "success": false,
  "message": "Book with ID 99 not found."
}
```

---

## 🗂 Project Structure

```
books-api/
├── server.js       ← Main API server
├── package.json    ← Project config & dependencies
└── README.md       ← This file
```

---

## ⚠️ Note
Data is stored **in memory** — it resets every time the server restarts.
