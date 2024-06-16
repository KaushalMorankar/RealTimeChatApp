const mongoose=require("mongoose")

const message=new mongoose.Schema({
    chatID:String,
    sender:String,
    messages1:String,
},{
    timestamps:true
})

const message2=mongoose.model("Message",message)

module.exports = {message2}