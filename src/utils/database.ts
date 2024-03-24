import mongoose from "mongoose";
import { MONGODB_URI } from "./server.config";

// Load environment variables from .env file
require("dotenv").config();

// MongoDB connection URI (replace placeholders with actual values)

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {});

// Get the default connection
const db = mongoose.connection;

// Event listener for MongoDB connection success
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event listener for MongoDB connection error
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Export MongoDB connection
export default db;
