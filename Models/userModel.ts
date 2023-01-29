/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */


import mongoose = require("mongoose");
import paginator = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    
    bdate: {
        type: String,
        require: true
    },

    email: { 
        type: String, 
        require: true, 
        unique: true 
    },
    
    password: { 
        type: String, 
        require: true 
    },

    resetPasswordToken: {
        type: String,
        required: false,
        default: null
      },

    imageUrl: {
        type: String,
        default: null
    }

});

userSchema.plugin(paginator);
export default mongoose.model('user', userSchema);
