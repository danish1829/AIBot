const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://summermunda101:8vBI6925WEMO0Oes@cluster1.fsbx9.mongodb.net/AIBot';
        await mongoose.connect(mongoURI);
        
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;