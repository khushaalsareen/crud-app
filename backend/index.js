const express = require('express');
const db = require('./config/db.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/User.js')

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


app.use('/users',userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
