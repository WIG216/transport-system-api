/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */




// import userController from "./userController";
// import authCheckController from "./authCheckController";
import driverController from "./driverController";
import vehicleController from "./vehicleController";
import logsController from "./logsController";
import driverFreeController from "./driverFreeController";
import freeRideController from "./freeRideController";
import * as unassignedController from "./unassignedController";
import bookingController from "./bookingController";
import rideController from "./rideController";


export default {
   
    // for vehicle
    getVehiclesController: vehicleController.getVehicle,
    getVehicleByDriverIdController: vehicleController.getVehicleById,
    createVehicleController: vehicleController.createVehicle,
    updateVehicleController: vehicleController.updateAVehicle,
    deleteVehicleController: vehicleController.deleteVehicle,

    // free driver state 
    getFreeDriverStateController: driverFreeController.getDriversFree,
    getFreeDriverStateByIdController: driverFreeController.getDriverFreeById,
    createFreeDriverStateController: driverFreeController.create,
    updateFreeDriverStateController: driverFreeController.updateDriverFree,
    deleteFreeDriverStateController: driverFreeController.deleteDriverFree,

    // ride
    getRidesController: rideController.getRides,
    getRideByIdController: rideController.getRideByDriverId,
    createRideController: rideController.createRide,
    updateRideController: rideController.updateARide,
    deleteRideController: rideController.deleteRide,

    // booking a ride
    getBookingController: bookingController.getBooking,
    getBookingByIdController: bookingController.getBookingById,
    createBookingController: bookingController.createBooking,
    updateBookingController: bookingController.updateABooking,
    deleteBookingController: bookingController.deleteBooking,
    

    // free ride state 
    getFreeRideStateController: freeRideController.getFreeRides,
    getFreeRideStateByIdController: freeRideController.getFreeRideById,
    createFreeRideStateController: freeRideController.create,
    updateFreeRideStateController: freeRideController.updateFreeRide,
    deleteFreeRideStateController: freeRideController.deleteFreeRide,

    // for unassigned
    getUnassignedController: unassignedController.default.getUnassigned,
    getUnassignedByIdController: unassignedController.default.getUnassignedById,
    createUnassignedController: unassignedController.default.createUnassigned,
    updateUnassignedController: unassignedController.default.updateUnassigned,
    deleteUnassignedController: unassignedController.default.deleteUnassigned, 

   // user
//    createUserController: userController.signUp,
//    loginUserController: userController.login,

   // driver
   createDriverController: driverController.signUp,
   loginDriverController: driverController.login,

   // logs
   getLogController: logsController.getLogs,

   // authCheck 
//    authCheckController: authCheckController.check
}

