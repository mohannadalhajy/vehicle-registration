import express from "express";
import VehicleMaintenanceController from "../controllers/vehicleMaintenanceController";

const router = express.Router();
const vehicleMaintenanceController = new VehicleMaintenanceController();
/**
 * @swagger
 * /vehicleMaintenances:
 *   post:
 *     summary: Add a new vehicle maintenance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../api-docs/components/schemas/VehicleMaintenances'
 *     responses:
 *       '200':
 *         description: Vehicle maintenance added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleMaintenancesOutput'
 */
router.post("/", vehicleMaintenanceController.logVehicleMaintenance);
/**
 * @swagger
 * /vehicleMaintenances:
 *   get:
 *     summary: Get a list of vehicles Maintenances
 *     responses:
 *       '200':
 *         description: List of vehicles Maintenances retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleMaintenancesList'
 */
router.get("/", vehicleMaintenanceController.getMaintenanceHistory);

export default router;
