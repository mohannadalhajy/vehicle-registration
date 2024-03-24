import mongoose, { Schema } from "mongoose";

// Define interface for Vehicle document
export interface IVehicleMaintenance extends Document {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  cost: number;
  date: Date;
}

// Define schema for Vehicle model
const vehicleMaintenanceSchema: Schema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Create and export Vehicle model
export default mongoose.model<IVehicleMaintenance>(
  "vehicleMaintenance",
  vehicleMaintenanceSchema
);
