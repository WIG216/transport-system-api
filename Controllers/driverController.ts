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
            name: req.body.name,
            email: req.body.email,
            bdate: req.body.bdate,
            password: hash,
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
    
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 10800 
          });
    
          res.status(200).send({
            // id: user._id,
            email: user.email,
            token: token
          });
        });
}



export default {
    checkDuplicateUsernameOrEmail,
    signUp, 
    login

};

