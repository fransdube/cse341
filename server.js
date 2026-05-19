const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const app = express();
const PORT = process.env.PORT || 10000; // Render's default port

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes/index'));

mongodb.initDB((err) => {
  if (err) {
    console.log('Unable to connect to database:', err);
    process.exit(1);
  } else {
    // Required: Bind to 0.0.0.0
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server/database is running on port ${PORT}`);
    });
  }
});
