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

router.get("/unassigned/",authMiddleware.authJwt.default.verifyToken, controller.getUnassignedController);
router.get("/unassigned/:id",authMiddleware.authJwt.default.verifyToken, controller.getUnassignedByIdController);
router.post("/unassigned/",authMiddleware.authJwt.default.verifyToken, controller.createUnassignedController);
router.patch("/unassigned/:id",authMiddleware.authJwt.default.verifyToken, controller.updateUnassignedController);
router.delete("/unassigned/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteUnassignedController);

export default router;