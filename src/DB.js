const mongoose = require("mongoose")
const DB = "mongodb+srv://MERN-TEJU_DEV:Tejas1234@cluster0.s8xktfa.mongodb.net/frontend-data"
mongoose.set('strictQuery', true)
mongoose.connect(DB).then(()=>{
    console.log("Mongo Connected");
}).catch((err)=>{
    console.log("Not connected, try later");
})
module.exports.mongoose=mongoose  
