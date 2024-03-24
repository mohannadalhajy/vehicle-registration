import { VehicleMaintenanceOutput } from "../../dto/vehicleMaintenance";
import VehicleMaintenance, {
  IVehicleMaintenance,
} from "../models/vehicleMaintenanceModel";
import SERVER_ERRORS from "../utils/server-errors.config";
import { ErrorResponse } from "../utils/server.config";

export default class VehicleMaintenanceService {
  async logVehicleMaintenance(
    vehicleId: string,
    type: string,
    description: string,
    cost: number
  ): Promise<IVehicleMaintenance> {
    try {
      const vehicleMaintenance = await VehicleMaintenance.create({
        vehicleId,
        type,
        description,
        cost,
      });
      return vehicleMaintenance;
    } catch (error: any) {
      throw new ErrorResponse(
        404,
        `Failed to log vehicle maintenance`,
        SERVER_ERRORS.VEHICLE_MAINTENANCE_ADDED_FAILED
      );
    }
  }

  async getMaintenanceHistory(): Promise<IVehicleMaintenance[]> {
    try {
      const maintenanceHistory = await VehicleMaintenance.find({}).exec();
      return maintenanceHistory;
    } catch (error: any) {
      throw new ErrorResponse(
        404,
        `Failed to retrieve maintenance history`,
        SERVER_ERRORS.VEHICLE_MAINTENANCE_NOT_FOUND
      );
    }
  }
  async getVehicleMaintenanceHistory(
    vehicleId: string
  ): Promise<IVehicleMaintenance[]> {
    try {
      const maintenanceHistory = await VehicleMaintenance.find({
        vehicleId,
      }).exec();
      return maintenanceHistory;
    } catch (error: any) {
      throw new ErrorResponse(
        404,
        `Failed to retrieve maintenance history`,
        SERVER_ERRORS.VEHICLE_MAINTENANCE_NOT_FOUND
      );
    }
  }
  async deleteVehicleMaintainces(vehicleId: string): Promise<void> {
    try {
      await VehicleMaintenance.deleteMany({ vehicleId });
    } catch (error: any) {
      throw new ErrorResponse(
        404,
        `Failed to delete vehicle`,
        SERVER_ERRORS.VEHICLE_DELETED_FAILED
      );
    }
  }
  getVehicleMaintenanceResponse(
    vehicleMaintenance: IVehicleMaintenance
  ): VehicleMaintenanceOutput {
    return new VehicleMaintenanceOutput(
      vehicleMaintenance.id,
      vehicleMaintenance.vehicleId.toString(),
      vehicleMaintenance.type,
      vehicleMaintenance.description,
      vehicleMaintenance.cost,
      vehicleMaintenance.date
    );
  }
}
