const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const user_Auth_Schema = new mongoose.Schema({
   //'firstName','lastName','mobile','emailId','password','gender','age'  
    firstName :String,
    lastName :String,
    mobile :String,
    emailId :String,
    password :String,
    gender :{
        type:String,
        enum:['male','female','LGBTQ']
    },
	isDeleted:{
        type:Boolean,
        default:false
    }, //default value is false 
    age : Number,
    data: {
         token : String
    }
},{timestamps:true})

user_Auth_Schema.pre('save',async function(next){
   if(this.isModified('password'))
   this.password= await bcrypt.hash(this.password,12) 
   console.log('Bcrypting passsword...')
})


const user_Auth_Model = mongoose.model('user_Auth',user_Auth_Schema)
module.exports=user_Auth_Model