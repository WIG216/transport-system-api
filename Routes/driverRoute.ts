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
import authMiddleware from "../middlewares";



const router = express.Router();

router.post("/driver/signup/",authMiddleware.verifySignUp, controller.createDriverController);
router.post("/driver/login/", controller.loginDriverController);
router.post("/auth-check/",authMiddleware.verifySignUp, controller.authCheckController);


router.get("/driver/",authMiddleware.authJwt.default.verifyToken, controller.getDriversController);
router.get("/driver/:id",authMiddleware.authJwt.default.verifyToken, controller.getDriverByIdController);
router.post("/driver-create/",authMiddleware.authJwt.default.verifyToken, controller.createDriverController);
router.patch("/driver/:id",authMiddleware.authJwt.default.verifyToken, controller.updateDriverController);
router.delete("/driver/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteDriverController);

export default router;