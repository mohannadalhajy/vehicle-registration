import mongoose, { Schema, Document } from "mongoose";

// Define interface for UsageAnalytics document
export interface IUsageAnalytics extends Document {
  id: string;
  vehicleI: Schema.Types.ObjectId;
  vehicleId: Schema.Types.ObjectId;
  date: Date;
  hoursOperated: number;
  distanceTraveled: number;
}

// Define schema for UsageAnalytics model
const usageAnalyticsSchema: Schema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle", // Reference to the Vehicle model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hoursOperated: {
    type: Number,
    required: true,
  },
  distanceTraveled: {
    type: Number,
    required: true,
  },
});

// Create and export UsageAnalytics model
export default mongoose.model<IUsageAnalytics>(
  "UsageAnalytics",
  usageAnalyticsSchema
);
