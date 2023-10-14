import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());

// ROUTES
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// Start server
app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});

