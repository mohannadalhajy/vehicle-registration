import { Request, Response } from "express";
import { UsageAnalyticsService } from "../services/usageAnalyticsService";
import {
  ErrorResponse,
  ServerResponse,
  getErrorResponse,
} from "../utils/server.config";
import SERVER_ERRORS from "../utils/server-errors.config";
import { UsageAnalyticsOutput } from "../../dto/usageAnalytics";
import { IUsageAnalytics } from "../models/usageAnalyticsModel";
const usageAnalyticsService = new UsageAnalyticsService();

export class UsageAnalyticsController {
  // Controller method to record usage analytics data
  async recordUsageAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { vehicleId, date, hoursOperated, distanceTraveled } = req.body;
      const usageAnalytics = await usageAnalyticsService.recordUsageAnalytics({
        vehicleId,
        date,
        hoursOperated,
        distanceTraveled,
      });
      const usageAnalyticsResponse: UsageAnalyticsOutput =
        usageAnalyticsService.getUsageAnalyticResponse(usageAnalytics);
      res
        .status(200)
        .json(
          new ServerResponse(200, "success", {
            usageAnalytics: usageAnalyticsResponse,
          })
        );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  // Controller method to retrieve usage analytics data for a specific vehicle within a date range
  async getUsageAnalyticsByDateRange(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      const parsedStartDate = startDate
        ? new Date(startDate as string)
        : undefined;
      const parsedEndDate = endDate ? new Date(endDate as string) : undefined;
      const usageAnalytics: IUsageAnalytics[] =
        await usageAnalyticsService.getUsageAnalyticsByDateRange(
          parsedStartDate,
          parsedEndDate
        );
      const usageAnalyticsResponse: UsageAnalyticsOutput[] = usageAnalytics.map(
        (rec) => usageAnalyticsService.getUsageAnalyticResponse(rec)
      );
      res.status(200).json(
        new ServerResponse(200, "success", {
          usageAnalytics: usageAnalyticsResponse,
        })
      );
    } catch (error) {
      const errorResponse = getErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
