import express, { Router, Request, Response } from "express";
import { UsageAnalyticsController } from "../controllers/usageAnalyticsController";

const router: Router = express.Router();
const usageAnalyticsController = new UsageAnalyticsController();

/**
 * @swagger
 * /usageAnalytics:
 *   post:
 *     summary: Add a new usage analytics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../api-docs/components/schemas/UsageAnalytics'
 *     responses:
 *       '200':
 *         description: Usage Analytics added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/UsageAnalyticsOutput'
 */
router.post("/", usageAnalyticsController.recordUsageAnalytics);

/**
 * @swagger
 * /usageAnalytics:
 *   get:
 *     summary: Get a list of usage analytics
 *     responses:
 *       '200':
 *         description: List of usage analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../api-docs/components/schemas/UsageAnalyticsList'
 */
router.get("/", usageAnalyticsController.getUsageAnalyticsByDateRange);

export default router;
