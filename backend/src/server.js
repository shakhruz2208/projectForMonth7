import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/reviews.js';
import blogRoutes from './routes/blog.js';
import tripRoutes from './routes/trips.js';
import checklistRoutes from './routes/checklist.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/checklist', checklistRoutes);

// API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'TripMate API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      reviews: '/api/reviews',
      blog: '/api/blog',
      trips: '/api/trips',
      checklist: '/api/checklist',
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TripMate API running on http://localhost:${PORT}`);
  console.log(`📡 API docs: http://localhost:${PORT}/api`);
});

export default app;