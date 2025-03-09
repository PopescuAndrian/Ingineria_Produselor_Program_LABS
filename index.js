const express = require('express');
const pool = require('./db'); // Import PostgreSQL connection

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// ✅ Health Check
app.get('/health', (req, res) => {
  res.json({ success: true, message: "Server is running and connected to PostgreSQL!" });
});

// ============================
// 🔹 Users CRUD Operations
// ============================

// ✅ GET /users - Retrieve all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET /users/:user_id - Retrieve a user by ID
app.get('/users/:user_id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.user_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST /users - Create a new user
app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================
// 🔹 Subreddits CRUD Operations
// ============================

// ✅ GET /subreddits - Retrieve all subreddits
app.get('/subreddits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subreddits');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST /subreddits - Create a new subreddit
app.post('/subreddits', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO subreddits (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================
// 🔹 Threads CRUD Operations
// ============================

// ✅ GET /threads - Retrieve all threads
app.get('/threads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM threads');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST /threads/:subreddit_id - Create a thread in a subreddit
app.post('/threads/:subreddit_id', async (req, res) => {
  const { subreddit_id } = req.params;
  const { author_id, title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO threads (subreddit_id, author_id, title, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [subreddit_id, author_id, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE /threads/:thread_id - Delete a thread
app.delete('/threads/:thread_id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM threads WHERE id = $1 RETURNING *', [req.params.thread_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
