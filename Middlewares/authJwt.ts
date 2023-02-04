import  jwt = require("jsonwebtoken");
const  config = require("../config/config");
import userModel = require("../Models/userModel");
import driverModel = require("../Models/driverModel");




const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
//   const bearerHeader = req.headers['x-access-token'];

//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     // console.log(bearerToken);
    
//     req.token = bearerToken;
//     jwt.verify(bearerToken, config.secret, (err, decoded) => {
//       if (err) {
//         console.log("unath");
        
//         return res.status(401).send({ message: "Unauthorized!", auth:false });
//       }
//       req.userId = decoded.id;
//       req.email = decoded.email;

//       console.log("authenticated");
      
//       next();
//     });
    
//   }
//   else{
//     return res.status(403).send({ message: "No token provided!", auth:false  });
//   }

};

export default {verifyToken} ;