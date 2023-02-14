/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */


import mongoose from "mongoose";
import paginator from "mongoose-paginate-v2";

const bookingSchema = new mongoose.Schema(
    {
      userId: {
        type: String
      },
      
      userEmail: {
        type: String,
        required: true,
      },
  
      fullName: {
        type: String,
        required: true,
      },
  
      tourName: {
          type: String,
          required: true
      },
  
      phone: {
        type: Number,
        required: true,
      },
  
      guestSize: {
        type: Number,
        required: true,
      },
  
      bookAt: {
          type: Date,
          required: true
      }
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Booking", bookingSchema);
