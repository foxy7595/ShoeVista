import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/productRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { cacheHeaders } from "./middleware/cacheHeaders.js";

dotenv.config();

const app = express();

app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

app.use(express.json());

// Cache headers for GET requests
app.use('/api', (req, res, next) => {
    if (req.method === 'GET') {
        return cacheHeaders(300)(req, res, next);
    }
    next();
});

// Mount routes with /api prefix
app.use("/api", router);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`App is connected to the database.`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};
startServer();
