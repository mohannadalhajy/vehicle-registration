import VehicleMaintenanceService from "./vehicleMaintenanceService";
import VehicleMaintenance, {
  IVehicleMaintenance,
} from "../models/vehicleMaintenanceModel";

// Mock the vehicle maintenance data
const mockVehicleMaintenance = {
  vehicleId: "65ff7395c73718e1c28b6d6f",
  type: "Oil Change",
  description: "Routine oil change",
  cost: 50,
  date: new Date("2024-03-25T10:00:00Z"),
};

// Mock VehicleMaintenance.create method
VehicleMaintenance.create = jest.fn().mockResolvedValue(mockVehicleMaintenance);

// Mock VehicleMaintenance.find method
VehicleMaintenance.find = jest.fn().mockResolvedValue([mockVehicleMaintenance]);

// Mock VehicleMaintenance.deleteMany method
VehicleMaintenance.deleteMany = jest.fn().mockResolvedValue({});

describe("VehicleMaintenanceService", () => {
  let vehicleMaintenanceService: VehicleMaintenanceService;

  beforeEach(() => {
    vehicleMaintenanceService = new VehicleMaintenanceService();
  });

  describe("logVehicleMaintenance", () => {
    it("logs vehicle maintenance", async () => {
      const result = await vehicleMaintenanceService.logVehicleMaintenance(
        "65ff7395c73718e1c28b6d6f",
        "Oil Change",
        "Routine oil change",
        50
      );
      expect(result).toEqual(mockVehicleMaintenance);
    });
  });

  // it("retrieves maintenance history", async () => {
  //   // Mocking VehicleMaintenance.find to return an empty array
  //   const mockVehicles: IVehicleMaintenance[] = [
  //     /* Mock vehicles array */
  //   ];
  //   (VehicleMaintenance.find as jest.Mock).mockResolvedValue(mockVehicles);

  //   const result:IVehicleMaintenance[]  = await vehicleMaintenanceService.getMaintenanceHistory();

  //   expect(result).toEqual(mockVehicles);
  // });
  // describe("getVehicleMaintenanceHistory", () => {
  //   it("retrieves maintenance history for a specific vehicle", async () => {
  //     // Mocking VehicleMaintenance.find to return an empty array
  //     (VehicleMaintenance.find as jest.Mock).mockResolvedValue([]);

  //     const result = await vehicleMaintenanceService.getVehicleMaintenanceHistory(
  //       "123"
  //     );

  //     // Expect the result to be an empty array
  //     expect(result).toEqual([]);
  //   });
  // });

  describe("deleteVehicleMaintainces", () => {
    it("deletes maintenance records for a specific vehicle", async () => {
      await vehicleMaintenanceService.deleteVehicleMaintainces(
        "65ff7395c73718e1c28b6d6f"
      );
      expect(VehicleMaintenance.deleteMany).toHaveBeenCalledWith({
        vehicleId: "65ff7395c73718e1c28b6d6f",
      });
    });
  });

  describe("getVehicleMaintenanceResponse", () => {
    it("returns VehicleMaintenanceOutput", () => {
      const output = vehicleMaintenanceService.getVehicleMaintenanceResponse(
        mockVehicleMaintenance as IVehicleMaintenance
      );
      expect(output).toBeDefined();
      // Add more assertions as needed for VehicleMaintenanceOutput properties
    });
  });
});
