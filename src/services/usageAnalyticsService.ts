import { UsageAnalyticsOutput } from "../../dto/usageAnalytics";
import UsageAnalytics, { IUsageAnalytics } from "../models/usageAnalyticsModel";
import SERVER_ERRORS from "../utils/server-errors.config";
import { ErrorResponse } from "../utils/server.config";

export class UsageAnalyticsService {
  // Method to record usage analytics data
  async recordUsageAnalytics(
    data: Partial<IUsageAnalytics>
  ): Promise<IUsageAnalytics> {
    try {
      const usageAnalytics = await UsageAnalytics.create(data);
      return usageAnalytics;
    } catch (error) {
      console.log(error);
      throw new ErrorResponse(
        404,
        `Error recording usage analytics`,
        SERVER_ERRORS.VEHICLE_USAGE_ADDED_FAILED
      );
    }
  }

  // Method to retrieve usage analytics data for a specific vehicle within a date range
  async getUsageAnalyticsByVehicle(
    vehicleId: string | undefined
  ): Promise<IUsageAnalytics[]> {
    try {
      const usageAnalytics = await UsageAnalytics.find({
        vehicleId: vehicleId,
      });
      return usageAnalytics;
    } catch (error) {
      throw new ErrorResponse(
        404,
        `Error retrieving usage analytics`,
        SERVER_ERRORS.VEHICLE_USAGE_NOT_FOUND
      );
    }
  }
  async getUsageAnalyticsByDateRange(
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Promise<IUsageAnalytics[]> {
    try {
      const usageAnalytics = await UsageAnalytics.find({
        date: { $gte: startDate, $lte: endDate },
      });
      return usageAnalytics;
    } catch (error) {
      throw new ErrorResponse(
        404,
        `Error retrieving usage analytics`,
        SERVER_ERRORS.VEHICLE_USAGE_NOT_FOUND
      );
    }
  }
  async deleteVehicleUsageAnalytics(vehicleId: string): Promise<void> {
    try {
      await UsageAnalytics.deleteMany({ vehicleId });
    } catch (error: any) {
      throw new ErrorResponse(
        404,
        `Failed to delete vehicle`,
        SERVER_ERRORS.VEHICLE_DELETED_FAILED
      );
    }
  }
  getUsageAnalyticResponse(
    usageAnalytics: IUsageAnalytics
  ): UsageAnalyticsOutput {
    return new UsageAnalyticsOutput(
      usageAnalytics.id,
      usageAnalytics.vehicleId.toString(),
      usageAnalytics.date,
      usageAnalytics.hoursOperated,
      usageAnalytics.distanceTraveled
    );
  }
}
