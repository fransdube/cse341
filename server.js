const express = require('express');
const mongodb = require('./data/database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

mongodb.initDB((err) => {
  if (err) {
    console.log('Unable to connect to database:', err);
    process.exit(1);
  } else {
    // Bind to 0.0.0.0 to accept connections from outside the container
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server/database is running on port ${PORT}`);
    });
  }
});