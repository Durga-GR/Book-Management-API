// =============================================
//   Books REST API — Node.js + Express
// =============================================

const express = require('express');
const app = express();
const PORT = 5000;

// ── Middleware ────────────────────────────────
app.use(express.json()); // Parse incoming JSON request bodies

// ── In-Memory Data Store ──────────────────────
let books = [
  { id: 1, title: 'The Great Gatsby',      author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee'          },
  { id: 3, title: '1984',                  author: 'George Orwell'       },
];

let nextId = 4; // Auto-increment counter for new book IDs

// ── Helper ────────────────────────────────────
const findBook    = (id) => books.find(b => b.id === id);
const findIndex   = (id) => books.findIndex(b => b.id === id);

// ==============================================
// GET /books — Retrieve all books
// ==============================================
app.get('/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// ==============================================
// GET /books/:id — Retrieve a single book
// ==============================================
app.get('/books/:id', (req, res) => {
  const id   = parseInt(req.params.id);
  const book = findBook(id);

  if (!book) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
  }

  res.status(200).json({ success: true, data: book });
});

// ==============================================
// POST /books — Add a new book
// ==============================================
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  // Validate required fields
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Both "title" and "author" fields are required.',
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book added successfully.',
    data: newBook,
  });
});

// ==============================================
// PUT /books/:id — Update an existing book
// ==============================================
app.put('/books/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = findIndex(id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
  }

  const { title, author } = req.body;

  // At least one field must be provided
  if (!title && !author) {
    return res.status(400).json({
      success: false,
      message: 'Provide at least one field to update: "title" or "author".',
    });
  }

  // Merge existing fields with updated values
  const updatedBook = {
    ...books[index],
    ...(title  && { title:  title.trim()  }),
    ...(author && { author: author.trim() }),
  };

  books[index] = updatedBook;

  res.status(200).json({
    success: true,
    message: 'Book updated successfully.',
    data: updatedBook,
  });
});

// ==============================================
// DELETE /books/:id — Remove a book
// ==============================================
app.delete('/books/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = findIndex(id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
  }

  const [deletedBook] = books.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully.',
    data: deletedBook,
  });
});

// ==============================================
// 404 — Catch-all for undefined routes
// ==============================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ==============================================
// Start Server
// ==============================================
app.listen(PORT, () => {
  console.log(`\n📚  Books API is running!`);
  console.log(`🌐  http://localhost:${PORT}/books\n`);
  console.log('Available endpoints:');
  console.log('  GET    /books        → List all books');
  console.log('  GET    /books/:id    → Get book by ID');
  console.log('  POST   /books        → Add a new book');
  console.log('  PUT    /books/:id    → Update a book');
  console.log('  DELETE /books/:id    → Delete a book\n');
});
