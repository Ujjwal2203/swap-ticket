import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    bookUser:{
        type:mongoose.Schema.Type.ObjectId,
        ref: "User",
    },
    noOfPeople:{
        type:Number,
        required:true,
        default:1,
    },
    date:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["pending","confirm","reject"],
        default:"pending"
    }
    




},{timestamps:true}) 

export const Ticket = mongoose.model("Ticket",ticketSchema);