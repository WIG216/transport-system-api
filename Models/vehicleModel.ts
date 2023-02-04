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
const vehicleSchema = new Schema({
    vehicleName: {
        type: String,
        require: true
    },
    model: { 
        type: String, 
        require: true, 
    },

    color: { 
        type: String, 
        require: true 
    },

    NoSeat: {
        type: Number,
        require: true
    },

    carImage: {
        type: String,
        require: true
    },

    driverId: {
        type: Schema.Types.ObjectId,
        ref: "driver"
    }
}, { timestamps: true });

vehicleSchema.plugin(paginator);
export default mongoose.model('vehicle', vehicleSchema);
