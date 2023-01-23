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

router.get("/lecturer/",authMiddleware.authJwt.default.verifyToken, controller.getLecturersController);
router.get("/lecturer/:id",authMiddleware.authJwt.default.verifyToken, controller.getLecturerByIdController);
router.post("/lecturer/",authMiddleware.authJwt.default.verifyToken, controller.createLecturerControler);
router.patch("/lecturer/:id",authMiddleware.authJwt.default.verifyToken, controller.updateLecturerController);
router.delete("/lecturer/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteLecturerController);

export default router;