const express = require('express');
const mongodb = require('./data/database');
const app = express();
const PORT = process.env.PORT || 3000;

// Add this middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

mongodb.initDB((err) => {
  if (err) {
    console.log('Unable to connect to database:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server/database is running on port ${PORT}`);
    });
  }
});