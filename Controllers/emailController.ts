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
import emailModel from "../Models/emailModel";
import mailer from "../Utils/mailer";
/**
 * 
 * used to create a Log
 *  @param req - request object
 *  @param res - response object
 */
const createEmail = (req: any, res: any) => {
  let emails =  req.body.emails.split(',');
  console.log(req.body.emails,"sssss");
  
    let data = [];
    emails.forEach((email:any) => {
        data.push({email:email, departmentId: req.body.department,lecturer:req.body.lecturer })
    });

    emailModel.insertMany(data).then((resData) => {
        res.status(response.CREATED_201);
        console.log(resData);
        
        res.json({
            success: true,
            docs: resData
        });
    }).catch(err => {
        console.log(err);
        
        res.status(response.BAD_REQUEST_400);
        res.json({
            success: false,
            docs: []
        })
    })

};


/**
 * 
 * used to get Logs
 *  @param req - request object
 *  @param res - response object
 */

const getEmails = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
const query = {
        lecturer: "",
        departmentId:"",
        campusId:''

}
// setting only data that comes through
if(req.query.department){
    query.departmentId = req.query.department;
}
else{
    delete query.departmentId;
}
if(req.query.lecturer){
    query.lecturer = req.query.lecturer;
}
else{
    delete query.lecturer;
}
if(req.query.campusId){
    query.campusId = req.query.campusId;
}
else{
    delete query.campusId;
}

      emailModel.find(query,(err,data)=>{
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
const getEmailById = (req: any, res: any) => {
  let id = req.params.id ? req.params.id : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  emailModel.findById(id,(err,data)=>{
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
 * used to update a Log
 *  @param req - request object
 *  @param res - response object
 */
const updateEmail = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;
    emailModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
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
 * used to delete a Log
 *  @param req - request object
 *  @param res - response object
 */
 const deleteEmail = (req: any, res: any) => {
    // setting the id of the Log if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the Log where {id} 
    emailModel.deleteOne({ _id: id }).then(val => {
        // Log deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Delleted document" : "Document Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // Log not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })

};
/**
 * 
 * used to get a cours by id
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const sendAEmails = (req: any, res: any) => {
    const query = {
        lecturer: true,
        departmentId:"",

}
// setting only data that comes through
// console.log(req.body,"body");

if(req.body.department == 'all'){
    delete query.departmentId;
}
else{
    query.departmentId = req.body.department;
}


if(req.body.lecturer == false ){
   query.lecturer = false;
}

// console.log(query,"quere");



let emailQuery = emailModel.find(query).select('email -_id')
emailQuery.exec((err,data)=>{
      if(!err){
          console.log(data,"data");
          
          mailer.mailer(req,res, data);
      }
      else{
        res.status(response.BAD_REQUEST_400);
                console.log(err)
                res.json({
                    success: false,
                    message: "Emails not sent"
                })
      }
    });


  
  };


export default {
  getEmails,
  getEmailById,
  createEmail,
  updateEmail,
  deleteEmail,
  sendAEmails
};

