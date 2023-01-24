/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 23 2023

 */

import response from "../messages/response";
import messages from "../messages/messages";


import path from "path"
import mongoosePaginate = require('mongoose-paginate-v2');
import freeRideModel from "../Models/freeRideModel";
/**
 * 
 * used to create a freeRide
 *  @param req - request object
 *  @param res - response object
 */
const create = (req: any, res: any) => {
    freeRideModel.create(req.body).then((data) => {
        res.status(response.CREATED_201);
        res.json({
            success: true,
            docs: data
        });
    }).catch(err => {
        res.status(response.BAD_REQUEST_400);
        res.json({
            success: false,
            docs: []
        })
    })

};


/**
 * 
 * used to get freeRides
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getFreeRides = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
    freeRideModel.find((err,data)=>{
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
 * used to get a lecturer free state by id
 *  @param req - request object
 *  @param res - response object
 */

const getFreeRideById = (req: any, res: any) => {
  let id = req.params.id ? req.params.id : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  freeRideModel.findById(id,(err,data)=>{
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
 * used to update a freeRide
 *  @param req - request object
 *  @param res - response object
 */
const updateFreeRide = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;
    freeRideModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
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
 * used to delete a freeRide
 *  @param req - request object
 *  @param res - response object
 */
 const deleteFreeRide = (req: any, res: any) => {
    // setting the id of the freeRide if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the freeRide where {id} 
    freeRideModel.deleteOne({ _id: id }).then(val => {
        // freeRide deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Deleted document" : "Document Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // freeRide not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })

};



export default {
  getFreeRides,
  getFreeRideById,
  create,
  updateFreeRide,
  deleteFreeRide
};

