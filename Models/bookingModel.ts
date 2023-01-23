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
    senderId:{
        type: Schema.Types.ObjectId, 
        ref: "user"
    },

    receiverId:{
        type: Schema.Types.ObjectId, 
        ref: "driver"
    },

    status:{
        type: String,
        enum: {
            values: ['active', 'completed', 'pending'],
            default: 'active'
            // message: '{VALUE} is not supported'
        }
    },

    // rideId: { 
    //     type: String, 
    //     require: true, 
    // },

    ride: {
        type: Schema.Types.ObjectId, ref: "ride"
    }
});

bookingSchema.plugin(paginator);
export default mongoose.model('Booking', bookingSchema);
