const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const axios = require("axios");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = require("./firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// IMPORTANT: Add test endpoints at root level for debugging
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.status(200).send("Backend server is running");
});

app.get("/health", (req, res) => {
  console.log("Health check received");
  res.status(200).send("OK");
});

// Import routes
const userRoutes = require("./routes/users");

// Debug middleware for user routes
app.use("/users", (req, res, next) => {
  console.log(`Request received at /api/users${req.path}: ${req.method}`);
  next();
});

// Mount routes
app.use("/users", userRoutes);

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    console.log(
      `Attempting to connect to MongoDB at ${
        process.env.MONGODB_URI.split("@")[1].split("/")[0]
      }`
    );

    const mongooseOptions = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: "majority",
    };

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    console.log("Successfully connected to MongoDB");

    const adminDb = mongoose.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();
    console.log(`Connected to MongoDB version: ${serverInfo.version}`);

    return true;
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    return false;
  }
};

// Start server regardless of MongoDB connection
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Try to connect to MongoDB after server has started
  connectToMongoDB().then((connected) => {
    if (connected) {
      console.log("Server is fully operational with MongoDB connection");
    } else {
      console.error("Server startup aborted due to MongoDB connection failure");
      process.exit(1); // Exit with failure code
    }
  });
});

module.exports = app;
