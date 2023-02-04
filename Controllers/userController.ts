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
import userModel from "../Models/userModel";
const config = require("../config/config");
import jwt = require("jsonwebtoken");


const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  userModel.findOne({
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

const signUp = (req, res) => {
  let password = bcrypt.hash(req.body.password, 8, (err, hash) => {
    console.log(hash, "pass");


    userModel.create({
      password: hash,
      email: req.body.email,
      name: req.body.name,
      bdate: req.body.bdate,
      userImage: req.body.userImage

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

const login = (req, res) => {


  userModel.findOne({
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

    // var token = jwt.sign({ id: user.id }, config.secret, {
    //   expiresIn: 10800
    // });

    // res.status(200).send({
    //   // id: user._id,
    //   email: user.email,
    //   token: token
    // });
  });
}

const updateUser = async (req, res) => {

  try {
    let userId = req.userId;

    let user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let imgUrl = req.body.imageUrl;

    user.imageUrl = imgUrl;

    await user.save();

    return res.status(200).send({ message: "User profile pic added", user: user });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}


export default {
  checkDuplicateUsernameOrEmail,
  signUp,
  login,
  updateUser

};

