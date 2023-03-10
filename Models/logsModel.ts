/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 23 2023

 */


import mongoose = require("mongoose");
import paginator = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const passengerSchema = new Schema({
    data: { 
        type: String, 
        require: true 
    },
    // create, delete, view, edit, login, logout
    type: { 
        type: Boolean, 
        require: true 
    },
    
});

passengerSchema.plugin(paginator);
export default mongoose.model('passenger', passengerSchema);
