import express, { Request, Response } from "express";
import VehicleController from "../controllers/vehicleController";
const router = express.Router();
const vehicleController = new VehicleController();

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../api-docs/components/schemas/Vehicle'
 *     responses:
 *       '200':
 *         description: Vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleOutput'
 */
router.post("/", vehicleController.addVehicle);

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get a list of vehicles
 *     responses:
 *       '200':
 *         description: List of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleList'
 */
router.get("/", vehicleController.getAllVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to retrieve
 *     responses:
 *       '200':
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleDetailsOutput'
 *       '404':
 *         description: Vehicle not found
 */
router.get("/:id", vehicleController.getVehicleById);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../api-docs/components/schemas/Vehicle'
 *     responses:
 *       '200':
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/VehicleOutput'
 *       '404':
 *         description: Vehicle not found
 */
router.put("/:id", vehicleController.updateVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to delete
 *     responses:
 *       '200':
 *         description: Vehicle deleted successfully
 *       '404':
 *         description: Vehicle not found
 */
router.delete("/:id", vehicleController.deleteVehicle);

export default router;
