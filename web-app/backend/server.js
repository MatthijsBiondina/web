const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const axios = require("axios"); // Add this package to fetch IP

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

// Function to get public IP address
async function getPublicIpAddress() {
  try {
    // Using ipify API to get the public IP
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error.message);
    return "Unable to determine IP";
  }
}

// MongoDB connection with enhanced diagnostics
const connectToMongoDB = async () => {
  try {
    console.log(
      `Attempting to connect to MongoDB at ${
        process.env.MONGODB_URI.split("@")[1].split("/")[0]
      }`
    );

    // Set more explicit connection options
    const mongooseOptions = {
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000, // 45 seconds
      family: 4, // Force IPv4
      retryWrites: true,
      w: "majority",
    };

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    console.log("Successfully connected to MongoDB");

    // Print database information as a further connection test
    const adminDb = mongoose.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();
    console.log(`Connected to MongoDB version: ${serverInfo.version}`);

    return true;
  } catch (err) {
    const publicIp = await getPublicIpAddress();
    console.error(
      `Could not connect to MongoDB. Your current public IP address is: ${publicIp}`
    );

    // Check if it's an IP whitelist error specifically
    if (err.message && err.message.includes("IP whitelist")) {
      console.error(
        `This IP address should be covered by your 185.132.187.0/24 whitelist entry.`
      );
      console.error(`Please verify the whitelist is active in MongoDB Atlas.`);
    }

    // Additional diagnostics
    console.error(`Connection error type: ${err.name}`);
    console.error(`Connection error code: ${err.code || "N/A"}`);
    console.error(`Detailed error message: ${err.message}`);

    // Attempt a basic network test to the MongoDB servers
    try {
      const mongoHost = process.env.MONGODB_URI.split("@")[1]
        .split("/")[0]
        .split(":")[0];
      console.log(`Testing network connectivity to ${mongoHost}...`);
      const dnsResult = await new Promise((resolve) => {
        require("dns").lookup(mongoHost, (err, address) => {
          if (err) {
            resolve(`DNS lookup failed: ${err.message}`);
          } else {
            resolve(`DNS resolved to ${address}`);
          }
        });
      });
      console.log(dnsResult);
    } catch (netErr) {
      console.error(`Network test failed: ${netErr.message}`);
    }

    console.error(`Full error details:`, err);
    return false;
  }
};

// Connect to MongoDB with enhanced diagnostics
console.log(process.env.MONGODB_URI);
connectToMongoDB().then((connected) => {
  if (connected) {
    // Import routes
    const userRoutes = require("./routes/users");
    // Use routes
    app.use("/api/users", userRoutes);

    // Start server only if MongoDB connection successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } else {
    console.log("Application continuing with MongoDB connection failed");
    // Still start the server even if MongoDB connection failed
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} (MongoDB connection failed)`)
    );
  }
});
