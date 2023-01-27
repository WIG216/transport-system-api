/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */
 
import userRoute from "./userRoute";
import bookingRoute from "./bookingRoute";
import emailRoute from "./emailRoute";
import driverRoute from "./driverRoute";
import rideRoute from "./rideRoute";
import logRoute from "./logRoute";
import unassignedRoutes from './unassignedRoute';
import vehicleRoute from "./vehicleRoute";



export default {
    logRoute,
    userRoute,
    emailRoute,
    bookingRoute,
    driverRoute,
    rideRoute,
    unassignedRoutes,
    vehicleRoute,
}