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

router.post("/user/signup/",authMiddleware.verifySignUp, controller.createUserController);
router.post("/user/login/",authMiddleware.verifySignUp, controller.loginUserController);
router.post("/user/update/",authMiddleware.verifySignUp, controller.updateUserController);
router.post("auth-check/",authMiddleware.verifySignUp, controller.authCheckController);

export default router;