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
const bookingSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: "user"
    },

    driverId:{
        type: Schema.Types.ObjectId, 
        ref: "driver"
    },

    status:{
        type: String,
        enum: {
            values: ['active', 'completed', 'pending']
           // message: '{VALUE} is not supported'
        }
    },

    // ride: {
    //     type: Schema.Types.ObjectId, ref: "ride"
    // }
});

bookingSchema.plugin(paginator);
export default mongoose.model('booking', bookingSchema);
