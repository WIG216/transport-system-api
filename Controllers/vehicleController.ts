/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */

import logger from "../logger";
import response from "../messages/response";
import messages from "../messages/messages";


import path from "path"
import mongoosePaginate = require('mongoose-paginate-v2');
import VehicleModel from "../Models/vehicleModel";

/**
 * 
 * used to create a vehicle
 *  @param req - request object
 *  @param res - response object
 */
const createVehicle = (req: any, res: any) => {
    VehicleModel.create(req.body).then((data) => {
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
 * used to get vehicle
 *  @param req - request object
 *  @param res - response object
 */
const getVehicle = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
    
    VehicleModel.find((err,data)=>{
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
 * used to get a vehicle by id
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getVehicleById = (req: any, res: any) => {
  let id = req.params.id ? req.params.id : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  VehicleModel.findById(id,(err,data)=>{
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
 * used to update a vehicle
 *  @param req - request object
 *  @param res - response object
 */
const updateAVehicle = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;

    VehicleModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
        if (err) {
            res.status(response.OK_200);
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
 * used to delete a vehicle
 *  @param req - request object
 *  @param res - response object
 */
 const deleteVehicle = (req: any, res: any) => {
    // setting the id of the vehicle if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the vehicle where {id} 
    VehicleModel.deleteOne({ _id: id }).then(val => {
        // vehicle deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Deleted Vehicle" : "Vehicle Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // vehicle not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })
  
  };


export default {
  getVehicle,
  getVehicleById,
  createVehicle,
  updateAVehicle,
  deleteVehicle
};

