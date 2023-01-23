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
const EmailSchema = new Schema({
    email: { type: String, unique: true },
    lecturer: {type:Boolean, default: false},
    departmentId: {type: String},
    
    
});

EmailSchema.plugin(paginator);
export default mongoose.model('emails', EmailSchema);
