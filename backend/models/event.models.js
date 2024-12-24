import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Type.ObjectId,
        ref: "User",
    },
    eventDate:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    ticketAvailablity:{
        type:Boolean,
        required:true,
        default:true,
    },
    description:{
        type:String,
        required: true,
    },
    

    




},{timestamps:true}) 

export const Event = mongoose.model("Event",eventSchema);