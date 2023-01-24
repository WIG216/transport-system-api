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

router.post("/driver-free/",authMiddleware.authJwt.default.verifyToken,controller.createFreeDriverStateController);
router.get("/driver-free/",authMiddleware.authJwt.default.verifyToken, controller.getFreeDriverStateController);
router.get("/driver-free/:id",authMiddleware.authJwt.default.verifyToken, controller.getFreeDriverStateByIdController);
router.patch("/driver-free/",authMiddleware.authJwt.default.verifyToken, controller.updateFreeDriverStateController);
router.delete("/driver-free/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteFreeDriverStateController);

export default router;