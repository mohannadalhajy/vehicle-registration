export class UsageAnalyticsOutput {
  constructor(
    public id: string,
    public vehicleId: string,
    public date: Date,
    public hoursOperated: number,
    public distanceTraveled: number
  ) {}
}
