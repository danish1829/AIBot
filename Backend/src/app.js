require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

const userRouter = require('./Routes/user');
const interviewRouter = require('./routes/interview');
app.use('/', userRouter);
app.use('/', interviewRouter);

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});
