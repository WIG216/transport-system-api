/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 24 2023

 */

import * as express from "express";
import controller from "../controllers";

// auth middleware
import authMiddleware from "../middlewares/index";



const router = express.Router();

router.post("/ride-free/",authMiddleware.authJwt.default.verifyToken,controller.createFreeDriverStateController);
router.get("/ride-free/",authMiddleware.authJwt.default.verifyToken, controller.getFreeRideStateController);
router.get("/ride-free/:id",authMiddleware.authJwt.default.verifyToken, controller.getFreeRideStateByIdController);
router.patch("/ride-free/",authMiddleware.authJwt.default.verifyToken, controller.updateFreeRideStateController);
router.delete("/ride-free/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteFreeRideStateController);

export default router;