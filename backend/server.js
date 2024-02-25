const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/favouriteRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
