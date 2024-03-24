import { Request, Response } from "express";
import VehicleMaintenanceService from "../services/vehicleMaintenanceService";
import VehicleService from "../services/vehicleService";
import {
  ErrorResponse,
  ServerResponse,
  getErrorResponse,
} from "../utils/server.config";
import { IVehicle } from "../models/vehicleModel";
import { IVehicleMaintenance } from "../models/vehicleMaintenanceModel";
import SERVER_ERRORS from "../utils/server-errors.config";
import { VehicleMaintenanceOutput } from "../../dto/vehicleMaintenance";
const vehicleMaintenanceService = new VehicleMaintenanceService();
const vehicleService = new VehicleService();
export default class VehicleMaintenanceController {
  async logVehicleMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { vehicleId, type, description, cost } = req.body;
      const vehicle: IVehicle | null = await vehicleService.getVehicleById(
        vehicleId
      );
      if (!vehicle) {
        throw new ErrorResponse(
          404,
          "Vehicle not found",
          SERVER_ERRORS.VEHICLE_NOT_FOUND
        );
      }
      const vehicleMaintenance: IVehicleMaintenance =
        await vehicleMaintenanceService.logVehicleMaintenance(
          vehicleId,
          type,
          description,
          cost
        );
      const maintenanceResponse: VehicleMaintenanceOutput =
        vehicleMaintenanceService.getVehicleMaintenanceResponse(
          vehicleMaintenance
        );
      res
        .status(200)
        .json(
          new ServerResponse(200, "success", {
            maintenance: maintenanceResponse,
          })
        );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  async getMaintenanceHistory(req: Request, res: Response): Promise<void> {
    try {
      const maintenances: IVehicleMaintenance[] =
        await vehicleMaintenanceService.getMaintenanceHistory();
        const maintenancesResponse: VehicleMaintenanceOutput[] = maintenances.map(
        (rec) => vehicleMaintenanceService.getVehicleMaintenanceResponse(rec)
      );
      res.status(200).json(
        new ServerResponse(200, "success", {
          maintenances: maintenancesResponse,
        })
      );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
