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
const driverSchema = new Schema({
    driverName: {
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
    driverImage: {
        type: String
    },

    status: {
        type: String,
        default: 'active'
        // enum: {
        //     values: ['active', 'inActive'],
        //     // message: '{VALUE} is not supported'
        // }
    },

    vehicle: {
        type: Schema.Types.ObjectId, ref: "vehicle"
    }

}, { timestamps: true });

driverSchema.pre('remove', function(next) {
    // CourseContent.remove({classroom_id: this._id}).exec();
    // PassExamContent.remove({class_room_id: this._id});
    // Participant.remove({class_room_id: this._id});
    
    next();
});

driverSchema.plugin(paginator);
export default mongoose.model('driver', driverSchema);
