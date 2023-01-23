/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */

import * as express from "express";
import controller from "../controllers";

// auth middleware
import authMiddleware from "../middlewares/index";



const router = express.Router();

router.post("/department-free/",authMiddleware.authJwt.default.verifyToken,controller.createDepartmentFreeStateController);
router.get("/department-free/",authMiddleware.authJwt.default.verifyToken, controller.getDepartmentFreeStateController);
router.get("/department-free/:id",authMiddleware.authJwt.default.verifyToken, controller.getDepartmentFreeStateByIdController);
router.patch("/department-free/",authMiddleware.authJwt.default.verifyToken, controller.updateDeparmentFreeStateController);
router.delete("/department-free/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteDepartmentFreeStateController);

export default router;