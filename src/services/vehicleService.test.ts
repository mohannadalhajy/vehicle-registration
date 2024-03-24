import VehicleService from "./vehicleService";
import Vehicle, { IVehicle } from "../models/vehicleModel";
import { ErrorResponse } from "../utils/server.config";
import SERVER_ERRORS from "../utils/server-errors.config";

// Mocking Vehicle model methods
jest.mock("../models/vehicleModel", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("VehicleService", () => {
  let vehicleService: VehicleService;

  beforeEach(() => {
    vehicleService = new VehicleService();
  });

  // Test case for addVehicle method
  it("adds a new vehicle", async () => {
    const mockVehicleData = {
      model: "ABC123",
      type: "car",
      status: "active",
      mac_address: "00:11:22:33:44:55",
      speed: 50,
      latitude: "40.7128° N",
      longitude: "74.0060° W",
    };
    const mockNewVehicle = {
      model: "ABC123",
      type: "car",
      status: "active",
      mac_address: "00:11:22:33:44:55",
      speed: 50,
      latitude: "40.7128° N",
      longitude: "74.0060° W",
    };
    (Vehicle.create as jest.Mock).mockResolvedValue(mockNewVehicle);

    const result = await vehicleService.addVehicle(mockVehicleData);

    expect(result).toEqual(mockNewVehicle);
  });

  // Test case for getAllVehicles method
  it("retrieves all vehicles", async () => {
    const mockVehicles: IVehicle[] = [
      /* Mock vehicles array */
    ];
    (Vehicle.find as jest.Mock).mockResolvedValue(mockVehicles);

    const result = await vehicleService.getAllVehicles();

    expect(result).toEqual(mockVehicles);
  });

  // Test case for getVehicleById method
  it("retrieves a single vehicle by ID", async () => {
    const mockVehicleId = "123";
    const mockVehicle = {
      /* Mock vehicle object */
    };
    (Vehicle.findById as jest.Mock).mockResolvedValue(mockVehicle);

    const result = await vehicleService.getVehicleById(mockVehicleId);

    expect(result).toEqual(mockVehicle);
  });

  // Test case for updateVehicle method
  it("updates a vehicle by ID", async () => {
    const mockVehicleId = "123";
    const mockUpdates = {
      /* Mock updates object */
    };
    const mockUpdatedVehicle = {
      /* Mock updated vehicle object */
    };
    (Vehicle.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedVehicle
    );

    const result = await vehicleService.updateVehicle(
      mockVehicleId,
      mockUpdates
    );

    expect(result).toEqual(mockUpdatedVehicle);
  });

  // Test case for deleteVehicle method
  it("deletes a vehicle by ID", async () => {
    const mockVehicleId = "65ff7391c73718e1c28b6d6d";
    // Mocking Vehicle.findByIdAndDelete to return null (vehicle not found)
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    // Use async/await and try/catch to handle the rejected promise
    try {
      // Call the deleteVehicle method
      await vehicleService.deleteVehicle(mockVehicleId);
      // If the vehicle is deleted successfully, this line will not be reached
      // Fail the test if the line is reached, as the vehicle should not be found
      fail("Expected error but received success");
    } catch (error) {
      // Assert that the error message matches the expected error message
      expect((error as ErrorResponse).message).toBe("Failed to delete vehicle");
      // Assert that the error code matches the expected error code (404)
      expect((error as ErrorResponse).statusCode).toBe(404);
    }
  });

  // Test case for deleteVehicle method when vehicle is not found
  it("throws error when attempting to delete a non-existent vehicle", async () => {
    const mockVehicleId = "123";
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(vehicleService.deleteVehicle(mockVehicleId)).rejects.toEqual(
      new ErrorResponse(
        404,
        "Failed to delete vehicle",
        SERVER_ERRORS.VEHICLE_DELETED_FAILED
      )
    );
  });
});
