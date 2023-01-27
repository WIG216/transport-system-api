/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */




import authCheckController from "./authCheckController";
import bookingController from "./bookingController";
import * as driverController from "./driverController";
import emailController from "./emailController";
import logsController from "./logsController";
import rideController from "./rideController";
import vehicleController from "./vehicleController";
import * as unassignedController from "./unassignedController";
import userController from "./userController";


export default {
   
    // for vehicle
    getVehiclesController: vehicleController.getVehicle,
    getVehicleByDriverIdController: vehicleController.getVehicleById,
    createVehicleController: vehicleController.createVehicle,
    updateVehicleController: vehicleController.updateAVehicle,
    deleteVehicleController: vehicleController.deleteVehicle,

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

    // for unassigned
    getUnassignedController: unassignedController.default.getUnassigned,
    getUnassignedByIdController: unassignedController.default.getUnassignedById,
    createUnassignedController: unassignedController.default.createUnassigned,
    updateUnassignedController: unassignedController.default.updateUnassigned,
    deleteUnassignedController: unassignedController.default.deleteUnassigned, 

   // user
   createUserController: userController.signUp,
   loginUserController: userController.login,
   updateUserController: userController.updateUser,

   // driver
   createDriverController: driverController.default.signUp,
   loginDriverController: driverController.default.login,

   // for drivers
   getDriversController: driverController.default.getDrivers,
   getDriverByIdController: driverController.default.getDriverById,
//    createDriverController: driverController.default.createDriver,
   updateDriverController: driverController.default.updateADriver, 
   deleteDriverController: driverController.default.deleteDriver, 

   // for email
   // for seating
   getEmailsController: emailController.getEmails,
   //getSeatingByIdController: seatingController.default.getSeatingById,
   createEmailControler: emailController.createEmail,
   updateEmailController: emailController.updateEmail,
   deleteEmailController: emailController.deleteEmail, 
   sendMailController: emailController.sendAEmails,

   // logs
   getLogController: logsController.getLogs,

   // authCheck 
   authCheckController: authCheckController.check
}

