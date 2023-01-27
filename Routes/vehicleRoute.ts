/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 23 2023

 */

import * as express from "express";
import controller from "../controllers";

// auth middleware
import authMiddleware from "../middlewares/index";



const router = express.Router();

router.get("/vehicle/",authMiddleware.authJwt.default.verifyToken, controller.getVehiclesController);
router.get("/vehicle/:id",authMiddleware.authJwt.default.verifyToken, controller.getVehicleByDriverIdController);
router.post("/vehicle/",authMiddleware.authJwt.default.verifyToken, controller.createVehicleController);
router.patch("/vehicle/:id",authMiddleware.authJwt.default.verifyToken, controller.updateVehicleController);
router.delete("/vehicle/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteVehicleController);

export default router;