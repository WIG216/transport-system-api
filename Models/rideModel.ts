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

const rideSchema = new Schema({
    address: {
        type: String,
        require: true
    },

    destination: { 
        type: String, 
        require: true, 
    },

    Mpoint: { 
        type: String, 
        require: true 
    },
    date: {
        type: Date,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },

    NoSeat: {
        type: Number,
        require: true
    },

    price:{
        type: Number,
        require: true
    },

    user_id: {
        type: Schema.Types.ObjectId, ref: "user"
    },

    vehicle: {
        type: Schema.Types.ObjectId, ref: "vehicle"
    }
});

rideSchema.plugin(paginator);
export default mongoose.model('ride', rideSchema);
