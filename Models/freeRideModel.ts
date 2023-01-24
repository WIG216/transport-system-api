/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday Jan 24 2023

 */


import mongoose = require("mongoose");
import paginator = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const freeRideSchema = new Schema({
    // semester+day+period+department
    state: { 
        type: String, 
        require: true 
    },
    ride: { 
        type: String, 
        require: true 
    },
});

freeRideSchema.plugin(paginator);
export default mongoose.model('rideState', freeRideSchema);
