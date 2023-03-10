/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 24 2023

 */

import logger from "../logger";
import response from "../messages/response";
import messages from "../messages/messages";


import path from "path"
import mongoosePaginate = require('mongoose-paginate-v2');
import RideModel from "../Models/rideModel";
import driversModel from "../Models/driverModel";
/**
 * 
 * used to create a Ride
 *  @param req - request object
 *  @param res - response object
 */
const createRide = (req: any, res: any) => {
    let drivers = req.body.driver;
  
    RideModel.create(req.body).then((data) => {
        // adding a ride to a driver
               drivers.forEach((element:any) => {
            console.log(element);
            driversModel.findByIdAndUpdate(element,{$push:{driver:data._id}},{},(departRrr:any, DepartData)=>{
                
            })
        });
       
       
        res.status(response.CREATED_201);
        res.json({
            success: true,
            docs: data
        }); 
    
    
    }).catch(err => {
        res.status(response.OK_200);
        res.json({
            success: false,
            docs: []
        })
    })

};


/**
 * 
 * used to get Rides
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getRides = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
    
    RideModel.find((err,data)=>{
      if(!err){
                 console.log(data)
            res.status(response.OK_200);
            res.json({
                success: true,
                docs: data
            });
      }
      else{
        res.status(response.BAD_REQUEST_400);
                console.log(err)
                res.json({
                    success: false,
                    docs: []
                })
      }
    });


};


/**
 * 
 * used to get a cours by id
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getRideByDriverId = (req: any, res: any) => {
  let id = req.params.driverId ? req.params.driverId : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  RideModel.find({driverId:id},(err,data)=>{
    if(!err){
               console.log(data)
          res.status(response.OK_200);
          res.json({
              success: true,
              docs: data
          });
    }
    else{
      res.status(response.BAD_REQUEST_400);
              console.log(err)
              res.json({
                  success: false,
                  docs: []
              })
    }
  });


};
/**
 * 
 * used to update a Ride
 *  @param req - request object
 *  @param res - response object
 */
const updateARide = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;

    RideModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
        if (err) {
            res.status(response.BAD_REQUEST_400);
            res.json({
                success: false,
                docs: []
            })
        }
        else {
            res.status(response.OK_200);
            res.json({
                success: true,
                docs: doc,
                message: "Updated Successfully"
            });
        }
    })
};
/**
 * 
 * used to delete a Ride
 *  @param req - request object
 *  @param res - response object
 */
 const deleteRide = (req: any, res: any) => {
    // setting the id of the Ride if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the Ride where {id} 
    RideModel.deleteOne({ _id: id }).then(val => {
        // Ride deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Deleted ride" : "Ride Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // Ride not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })
  
  };


export default {
  getRides,
  getRideByDriverId,
  createRide,
  updateARide,
  deleteRide
};

