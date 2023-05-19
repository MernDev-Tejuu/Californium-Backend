const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const user_Auth_Model = new mongoose.Schema({
    //"firstname","lastName","emailId","password","age","gender","mobile"
    firstName :String,
    lastName : String,
    emailId : String,
    password :String,
    age : Number,
    gender :{
        type :String,
        enum:['male','female',"others"]

    },
    mobile:String,
    isDeleted :{
        type : Boolean,
        default : false
    },
    data : {
       token :{
        type :String
       }
    }
},{timestamps : true})


user_Auth_Model.pre("save",async function(next){
    if(this.isModified("password"))
    {this.password = await bcrypt.hash(this.password,12)}
    console.log("bcrypting password...")
    
    next()
})

const auth_Model = mongoose.model('user_Auth3',user_Auth_Model) 
module.exports = auth_Model