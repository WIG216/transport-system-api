/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */




import userController from "./userController";
import emailController from "./emailController";
import authCheckController from "./authCheckController";
import driverController from "./driverController";
import vehicleController from "./vehicleController";


export default {
   
    // for class
    getVehiclesController: vehicleController.getVehicle,
    getClassByCampusIdController: vehicleController.getVehicleById,
    createClassControler: vehicleController.createVehicle,
    updateVehicleController: vehicleController.updateAVehicle,
    deleteVehicleController: vehicleController.deleteVehicle,

   // user
   createUserController: userController.signUp,
   loginUserController: userController.login,

   // driver
   createDriverController: driverController.signUp,
   loginDriverController: driverController.login,


   // for email
   // for seating
   getEmailsController: emailController.getEmails,
   //getSeatingByIdController: seatingController.default.getSeatingById,
   createEmailControler: emailController.createEmail,
   updateEmailController: emailController.updateEmail,
   deleteEmailController: emailController.deleteEmail, 
   sendMailController: emailController.sendAEmails,

   // authCheck 
   authCheckController: authCheckController.check
}

