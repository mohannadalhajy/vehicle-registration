export class VehicleMaintenanceOutput {
  constructor(
    public id: string,
    public vehicleId: string,
    public type: string,
    public description: string,
    public cost: number,
    public date: Date
  ) {}
}
