/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */


import express = require('express');

import cors = require('cors');

import logger from "../logger/index"

import messages from "../messages/messages"

import allRouter from "../routes/index"

import mongo from "../mongo/connector";




/**
 * 
 * use to BOOT and start server
 */
let startApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());


/**
 * 
 * use automatically add all exported routes
 *  @param routers - all exported routers
 */
const registerRoutes =  (routers: any): void  => {
    try {
        if (Object.keys(routers) && Object.keys(routers).length) {
            logger.info(`BOOT :: Registering routes started`);
            // let i = 0;
            Object.keys(routers).forEach(key => {
                // i++;
                // console.log(key, "endpoint", i);
                
                app.use("/", routers[key]);
            });
            logger.info("BOOT :: Registering routes done");
        }
    } catch (err) {
        logger.error(`BOOT :: Error while registering routes. Check routes : ${JSON.stringify(err.message)}`);
    }
};
    registerRoutes(allRouter ? allRouter : "can't get the routes");
    app.listen(7200, () => {
        // CONNECTING TO DATABASE
        mongo().once('open', () => {
    logger.info("BOOT :: ", messages.DATABASE_SUCCESS);
  })
    logger.info("BOOT :: ",messages.SERVER_STARTED, `http://localhost:7200`)
})
}

export default startApp;

