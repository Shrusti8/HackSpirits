const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve all static files from frontend folder (outside backend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ======== Page Routes ========
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dashboard.html'));
});

app.get('/project', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'project.html'));
});

app.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'forgot.html'));
});

// ======== Example API Route ========
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // TODO: Replace with DB check
  if (email === 'test@example.com' && password === '123456') {
    return res.json({ success: true, token: 'fake-jwt-token', message: 'Login successful' });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});