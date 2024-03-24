import express from "express";
import vehicleRoutes from "./src/routes/vehicleRoutes";
import vehicleMaintenanceRoutes from "./src/routes/vehicleMaintenanceRoutes";
import usageAnalyticsRoutes from "./src/routes/usageAnalyticsRoutes";
import db from "./src/utils/database";
import { SERVER_PORT } from "./src/utils/server.config";
import cors from 'cors';
import swagger from './swagger';
const app = express();
swagger(app);
// Enable all CORS requests
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/vehicleMaintenances", vehicleMaintenanceRoutes);
app.use("/api/usageAnalytics", usageAnalyticsRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Vehicle Management System");
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
db;
// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled promise rejection:", err);
  process.exit(1);
});
