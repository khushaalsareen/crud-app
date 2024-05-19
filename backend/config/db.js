const mysql = require('mysql2');

// Creating  MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PariSisa@1501', 
    database: 'userdb'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL connected...');
  });
  

  module.exports = db