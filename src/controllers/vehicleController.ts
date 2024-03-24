import { Request, Response } from "express";
import VehicleService from "../services/vehicleService";
import VehicleMaintenanceService from "../services/vehicleMaintenanceService";
import {
  ErrorResponse,
  ServerResponse,
  getErrorResponse,
} from "../utils/server.config";
import { IVehicle } from "../models/vehicleModel";
import { IVehicleMaintenance } from "../models/vehicleMaintenanceModel";
import { VehicleOutput } from "../../dto/vehicle";
import SERVER_ERRORS from "../utils/server-errors.config";
import { VehicleMaintenanceOutput } from "../../dto/vehicleMaintenance";
import { UsageAnalyticsService } from "../services/usageAnalyticsService";
import { IUsageAnalytics } from "../models/usageAnalyticsModel";
import { UsageAnalyticsOutput } from "../../dto/usageAnalytics";
import { VehicleDetailsOutput } from "../../dto/vehicleDetails";
const vehicleMaintenanceService = new VehicleMaintenanceService();
const usageAnalyticsService = new UsageAnalyticsService();
const vehicleService = new VehicleService();

export default class VehicleController {
  // Method to add a new vehicle
  async addVehicle(req: Request, res: Response): Promise<void> {
    try {
      const vehicleData = req.body;
      const newVehicle: IVehicle = await vehicleService.addVehicle(vehicleData);
      const newVehicleResponse = vehicleService.getVehicleResponse(newVehicle);
      res
        .status(200)
        .json(
          new ServerResponse(200, "success", { vehicle: newVehicleResponse })
        );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  // Method to retrieve all vehicles
  async getAllVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles: IVehicle[] = await vehicleService.getAllVehicles();
      const vehiclesResponse: VehicleOutput[] = vehicles.map((rec) =>
        vehicleService.getVehicleResponse(rec)
      );
      res
        .status(200)
        .json(
          new ServerResponse(200, "success", { vehicles: vehiclesResponse })
        );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  // Method to retrieve a single vehicle by ID
  async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle: IVehicle | null = await vehicleService.getVehicleById(id);
      if (!vehicle)
        throw new ErrorResponse(
          404,
          "Vehicle not found",
          SERVER_ERRORS.VEHICLE_NOT_FOUND
        );
      const vehicleResponse: VehicleOutput =
        vehicleService.getVehicleResponse(vehicle);
      const maintenances: IVehicleMaintenance[] =
        await vehicleMaintenanceService.getVehicleMaintenanceHistory(id);
      const maintenancesResponse: VehicleMaintenanceOutput[] = maintenances.map(
        (rec) => vehicleMaintenanceService.getVehicleMaintenanceResponse(rec)
      );
      const analytics: IUsageAnalytics[] =
        await usageAnalyticsService.getUsageAnalyticsByVehicle(id);
      const analyticsResponse: UsageAnalyticsOutput[] = analytics.map((rec) =>
        usageAnalyticsService.getUsageAnalyticResponse(rec)
      );
      const response = new VehicleDetailsOutput(
        vehicleResponse,
        maintenancesResponse,
        analyticsResponse
      );
      res.status(200).json(new ServerResponse(200, "success", response));
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  // Method to update a vehicle by ID
  async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const updatedVehicle: IVehicle | null =
        await vehicleService.updateVehicle(req.params.id, req.body);
      const updatedVehicleResponse: VehicleOutput =
        vehicleService.getVehicleResponse(updatedVehicle);
      res.status(200).json(
        new ServerResponse(200, "success", {
          vehicle: updatedVehicleResponse,
        })
      );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  // Method to delete a vehicle by ID
  async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      await vehicleService.deleteVehicle(req.params.id);
      await vehicleMaintenanceService.deleteVehicleMaintainces(req.params.id);
      await usageAnalyticsService.deleteVehicleUsageAnalytics(req.params.id);
      res.status(200).json(new ServerResponse(200, "success", {}));
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
