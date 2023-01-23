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

router.get("/seating/:semesterId",authMiddleware.authJwt.default.verifyToken, controller.getSeatingController);
router.get("/seating/:semesterId/:departmentId",authMiddleware.authJwt.default.verifyToken, controller.getSeatingByIdsController);
router.post("/seating/:campusId/:semesterId",authMiddleware.authJwt.default.verifyToken, controller.createSeatingControler);
router.patch("/seating/:id",authMiddleware.authJwt.default.verifyToken, controller.updateSeatingController);
router.delete("/seating/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteSeatingController);

export default router;