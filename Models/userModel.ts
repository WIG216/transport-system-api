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
    name: {
        type: String,
        require: true
    },
    bdate: {
        type: Date,
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

    image: {
        type: String,
        require: true 
    }

});

userSchema.plugin(paginator);
export default mongoose.model('user', userSchema);
