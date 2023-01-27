/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Tuesday jan 24 2023

 */


import mongoose = require("mongoose");
import paginator = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    },

    driverId: {
        type: Schema.Types.ObjectId,
        ref: "driver"
    },

    bookingId: {
        type: Schema.Types.ObjectId, 
        ref: "booking"
    }
});

passengerSchema.plugin(paginator);
export default mongoose.model('passenger', passengerSchema);
