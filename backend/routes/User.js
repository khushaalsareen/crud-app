const express = require('express')
const db = require('../config/db.js');
const { getUsers, createUser, updateUser, deleteUser, getOneUser } = require('../controllers/Users.js');
const app = express.Router();

// Getting all users
app.get('/', getUsers);
  
  // Creating a new user
  app.post('/', createUser);
  
  // Updating a user
  app.put('/:id', updateUser);
  
  // Deleting a user
  app.delete('/:id', deleteUser);

  // getting one user
  app.get('/:id', getOneUser);

  module.exports = app