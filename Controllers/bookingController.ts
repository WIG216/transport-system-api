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
import BookingModel from "../Models/bookingModel";

/**
 * 
 * used to create a booking
 *  @param req - request object
 *  @param res - response object
 */
const createBooking = (req: any, res: any) => {
    BookingModel.create(req.body).then((data) => {
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
 * used to get booking
 *  @param req - request object
 *  @param res - response object
 */
const getBooking = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
    
    BookingModel.find((err,data)=>{
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
 * used to get a booking by id
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getBookingById = (req: any, res: any) => {
  let id = req.params.id ? req.params.id : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  BookingModel.findById(id,(err,data)=>{
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
 * used to update a booking
 *  @param req - request object
 *  @param res - response object
 */
const updateABooking = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;

    BookingModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
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
 * used to delete a booking
 *  @param req - request object
 *  @param res - response object
 */
 const deleteBooking = (req: any, res: any) => {
    // setting the id of the booking if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the booking where {id} 
    BookingModel.deleteOne({ _id: id }).then(val => {
        // booking deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Deleted booking" : "booking Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // booking not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })
  
  };


export default {
  getBooking,
  getBookingById,
  createBooking,
  updateABooking,
  deleteBooking
};

