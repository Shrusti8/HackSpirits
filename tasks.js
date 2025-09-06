const express = require('express');
const router = express.Router();
const db = require('../db');

// Get tasks for a project
router.get('/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE project_id = ?', [projectId]);
    res.json(tasks);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add task
router.post('/', async (req, res) => {
  const { project_id, title, assignee, status, due_date } = req.body;
  try {
    await db.query(
      'INSERT INTO tasks (project_id, title, assignee, status, due_date) VALUES (?, ?, ?, ?, ?)',
      [project_id, title, assignee, status, due_date]
    );
    res.json({ message: 'Task added successfully' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  try {
    await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
    res.json({ message: 'Task updated successfully' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;