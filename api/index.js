import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import listingRoutes from './routes/item.route.js';
import orderRoutes from './routes/order.route.js';
import userRoutes from './routes/user.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comment', commentRoutes);
app.get('/api/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(`Fetching user with ID: ${userId}`); // Debugging statement
  
    try {
      const user = await User.findById(userId); // Assuming you're using Mongoose
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(`Error fetching user: ${error.message}`); // Log any errors
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server Started on port 3000');
});
