const mongoose = require("mongoose")
const DB = "mongodb+srv://MERN-TEJU_DEV:Tejas1234@cluster0.s8xktfa.mongodb.net/frontend"
mongoose.set('strictQuery', true)
mongoose.connect(DB).then(()=>{
    console.log('Trying to connect to MongoDB...');
    
    console.log("Mongo Connected");
}).catch((err)=>{
    console.log("Not connected, try later");
})
module.exports.mongoose=mongoose  


//After implemementing all steps ,but still why its not consoling the string 
//ANS : coz after exporting ,i was imported by require('../mongoode/DB) wrong step 
//require('mongoose')