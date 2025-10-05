const express = require('express');
const connectDB = require('./config/database');
const app = express()

app.use(express.json());

connectDB().then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');  
    })
    
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
})