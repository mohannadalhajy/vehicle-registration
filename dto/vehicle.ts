export class VehicleOutput {
  constructor(
    public id: string,
    public model: string,
    public type: string,
    public status: string,
    public mac_address: string,
    public speed: number,
    public latitude: string,
    public longitude: string
  ) {}
}
