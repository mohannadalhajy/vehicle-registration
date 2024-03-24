import { VehicleOutput } from "../../dto/vehicle";
import Vehicle, { IVehicle } from "../models/vehicleModel";
import SERVER_ERRORS from "../utils/server-errors.config";
import { ErrorResponse } from "../utils/server.config";

export default class VehicleService {
  // Method to add a new vehicle
  async addVehicle(vehicleData: any): Promise<IVehicle> {
    try {
      const newVehicle: IVehicle = await Vehicle.create(vehicleData);
      return newVehicle;
    } catch (error: any) {
      throw new ErrorResponse(404, `Failed to add vehicle`, SERVER_ERRORS.VEHICLE_ADDED_FAILED);
    }
  }

  // Method to retrieve all vehicles
  async getAllVehicles(): Promise<IVehicle[]> {
    try {
      const vehicles: IVehicle[] = await Vehicle.find();
      return vehicles;
    } catch (error: any) {
      throw new ErrorResponse(404, `Vehicle not found`, SERVER_ERRORS.VEHICLE_NOT_FOUND);
    }
  }

  // Method to retrieve a single vehicle by ID
  async getVehicleById(id: string): Promise<IVehicle | null> {
    try {
      const vehicle: IVehicle | null = await Vehicle.findById(id);
      return vehicle;
    } catch (error: any) {
      throw new ErrorResponse(404, `Vehicle not found`, SERVER_ERRORS.VEHICLE_NOT_FOUND);
    }
  }

  // Method to update a vehicle by ID
  async updateVehicle(id: string, updates: any): Promise<IVehicle> {
    try {
      const updatedVehicle: IVehicle | null = await Vehicle.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      if (!updatedVehicle) throw new ErrorResponse(404, `Vehicle not found`, SERVER_ERRORS.VEHICLE_UPDATED_FAILED);
      return updatedVehicle;
    } catch (error: any) {
      throw new ErrorResponse(404, `Failed to update vehicle`, SERVER_ERRORS.VEHICLE_UPDATED_FAILED);
    }
  }

  // Method to delete a vehicle by ID
  async deleteVehicle(id: string): Promise<void> {
    try {
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);
      if (!deletedVehicle)
        throw new ErrorResponse(404, `Failed to delete vehicle`, SERVER_ERRORS.VEHICLE_DELETED_FAILED);
    } catch (error: any) {
      throw new ErrorResponse(404, `Failed to delete vehicle`, SERVER_ERRORS.VEHICLE_DELETED_FAILED);
    }
  }
  getVehicleResponse(vehicle: IVehicle): VehicleOutput {
    return new VehicleOutput(
      vehicle.id,
      vehicle.model,
      vehicle.type,
      vehicle.status,
      vehicle.mac_address,
      vehicle.speed,
      vehicle.latitude,
      vehicle.longitude
    );
  }
}
