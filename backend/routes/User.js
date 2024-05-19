const express = require('express')
const db = require('../config/db.js')
const app = express.Router();

// Getting all users
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  // Creating a new user
  app.post('/', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...newUser });
    });
  });
  
  // Updating a user
  app.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    const sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [updatedUser, id], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  // Deleting a user
  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  module.exports = app