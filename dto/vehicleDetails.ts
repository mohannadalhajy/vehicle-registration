import { UsageAnalyticsOutput } from "./usageAnalytics";
import { VehicleOutput } from "./vehicle";
import { VehicleMaintenanceOutput } from "./vehicleMaintenance";

export class VehicleDetailsOutput {
  constructor(
    public vehicle: VehicleOutput,
    public maintenances: VehicleMaintenanceOutput[],
    public usageAnalytics: UsageAnalyticsOutput[]
  ) {}
}
