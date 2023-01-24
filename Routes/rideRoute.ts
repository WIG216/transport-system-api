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

router.get("/ride/",authMiddleware.authJwt.default.verifyToken, controller.getRidesController);
router.get("/ride/:id",authMiddleware.authJwt.default.verifyToken, controller.getRideByIdController);
router.post("/ride/",authMiddleware.authJwt.default.verifyToken, controller.createRideController);
router.patch("/ride/:id",authMiddleware.authJwt.default.verifyToken, controller.updateRideController);
router.delete("/ride/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteRideController)

export default router;