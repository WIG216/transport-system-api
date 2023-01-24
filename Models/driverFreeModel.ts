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
const freeDriverSchema = new Schema({
    state: { 
        type: String, 
        enum: {
            values: ['active', 'inactive']
        },
        require: true 
    },

    ride: { 
        type: String, 
        require: true 
    },
});

freeDriverSchema.plugin(paginator);
export default mongoose.model('driverState', freeDriverSchema);
