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

router.get("/campus/",authMiddleware.authJwt.default.verifyToken, controller.getCampusesController);
router.get("/campus/:id",authMiddleware.authJwt.default.verifyToken, controller.getCampusByIdController);
router.post("/campus/",authMiddleware.authJwt.default.verifyToken, controller.createCampusControler);
router.patch("/campus/:id",authMiddleware.authJwt.default.verifyToken, controller.updatecampusController);
router.delete("/campus/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteCampusController);

export default router;