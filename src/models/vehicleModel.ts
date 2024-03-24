import mongoose, { Schema } from "mongoose";
// Define interface for Vehicle document
export interface IVehicle extends Document {
  id: string;
  model: string;
  type: string;
  status: string;
  mac_address: string;
  speed: number;
  latitude: string;
  longitude: string;
}

// Define schema for Vehicle model
const vehicleSchema: Schema = new Schema({
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "maintenance", "inactive"],
    required: true,
  },
  mac_address: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  },
  longitude: {
    type: String,
    required: false,
  },
});

// Create and export Vehicle model
export default mongoose.model<IVehicle>("Vehicle", vehicleSchema);
