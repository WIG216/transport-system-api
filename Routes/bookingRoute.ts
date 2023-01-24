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

router.get("/booking/",authMiddleware.authJwt.default.verifyToken, controller.getBookingController);
router.get("/booking/:bookingId",authMiddleware.authJwt.default.verifyToken, controller.getBookingByIdController);
router.post("/booking/",authMiddleware.authJwt.default.verifyToken, controller.createBookingController);
router.patch("/booking/:id",authMiddleware.authJwt.default.verifyToken, controller.updateBookingController);
router.delete("/booking/:id",authMiddleware.authJwt.default.verifyToken, controller.deleteBookingController);

export default router;