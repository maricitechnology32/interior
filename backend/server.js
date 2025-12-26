import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Route Imports
import blogRoutes from './routes/blogRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import userRoutes from './routes/userRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import aboutContentRoutes from './routes/aboutContentRoutes.js';
import contactSettingsRoutes from './routes/contactSettingsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import transformationRoutes from './routes/transformationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


// Middleware Imports
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Global Security Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
//   message: 'Too many requests from this IP, please try again after 15 minutes',
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use('/api', limiter);

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/about', aboutContentRoutes);
app.use('/api/contact-settings', contactSettingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/transformations', transformationRoutes);
app.use('/api/upload', uploadRoutes);
// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  )
);