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

import bcrypt = require("bcryptjs");
import driverModel from "../Models/driverModel";
const  config = require("../config/config");
import  jwt = require("jsonwebtoken");


const checkDuplicateUsernameOrEmail = (req, res, next) => {
   // Email
   driverModel.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  });
};

const signUp = (req,res)=>{
    let password = bcrypt.hash(req.body.password, 8, (err,hash)=>{
        console.log(hash, "pass");
    
        
        driverModel.create({
            driverName: req.body.driverName,
            email: req.body.email,
            bdate: req.body.bdate,
            password: hash,
            status: req.body.status,
            driverImage: req.body.driverImage

        }).then((data) => {
         
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
    });
 

}

const login = (req,res)=>{

    
    driverModel.findOne({
        email: req.body.email
      }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          console.log(passwordIsValid);
      
          console.log(user.password, req.body.password);
      
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
      
          var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
            expiresIn: 86400, // 24 hours
          });   
      
          res.status(200).send({
            accessToken: token,
          });
        });
}

/**
 * 
 * used to create a course
 *  @param req - request object
 *  @param res - response object
 */
const createDriver = (req: any, res: any) => {
    console.log(req.body, "body")
    driverModel.create(req.body).then((data) => {
        res.status(response.CREATED_201);
        res.json({
            success: true,
            docs: data,
            message: "Created successfully"
        });
    }).catch(err => {
        console.log(err);
        
        res.status(response.OK_200);
        res.json({
            success: false,
            docs: []
        })
    })

};


/**
 * 
 * used to get courses
 *  @param req - request object
 *  @param res - response object
 */
// 603eb2ee77259abd63745b4d
const getDrivers = (req: any, res: any) => {
    const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 10,
    };
    
    driverModel.find().populate('courses').exec((err,data)=>{
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
const getDriverById = (req: any, res: any) => {
  let id = req.params.id ? req.params.id : '';
  const options = {
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 10,
  };
  
  driverModel.findById(id,(err,data)=>{
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
 * used to update a course
 *  @param req - request object
 *  @param res - response object
 */
const updateADriver = (req: any, res: any) => {
    let id = req.params.id ? req.params.id : '';

    let updateData = req.body;
    driverModel.findOneAndUpdate({ _id: id}, updateData, { new: true }, (err, doc) => {
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
 * used to delete a lecturer
 *  @param req - request object
 *  @param res - response object
 */
 const deleteDriver = (req: any, res: any) => {
    // setting the id of the lecturer if passed to {id}
    let id = req.params.id ? req.params.id : '';
   
    // deleting the lecturer where {id} 
    driverModel.deleteOne({ _id: id }).then(val => {
        // lecturer deleted
        let docCount = val.deletedCount;
        let responsMessage = docCount ? "Deleted document" : "Document Not found";
        res.status(response.OK_200);
        res.json({
            success: true,
            deletedCount: docCount,
            message: responsMessage
        })
      
    }).catch(err => {
        // lecturer not deleted
        res.status(response.NO_CONTENT_204);
        res.json({
            success: false,
            message: "Error occured"
        })
    })
  
  };

  export default {
    checkDuplicateUsernameOrEmail,
    signUp, 
    login,
    getDriverById,
    getDrivers,
    createDriver,
    updateADriver,
    deleteDriver

};


