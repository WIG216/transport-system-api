/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */


import Booking from '../models/bookingModel.js'

export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        
        res.status(200).json({
            success: true,
            message: "Your tour is booked",
            data: savedBooking
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: 'internal server error'
        })
    }
}

// get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id

    try {
        const book = await Booking.findById(id)
        res.status(200).json({success: true, message: 'successful', data: book })
    } catch (error) {
        res.status(404).json({
            success: false, message: 'not found'
        })
    }
}

// get all booking
export const getAllBooking = async(req,res)=>{

    try {
        const book = await Booking.find()
        res.status(200).json({success: true, message: 'successful', data: book })
    } catch (error) {
        res.status(500).json({
            success: false, message: 'internal server error'
        })
    }
}
