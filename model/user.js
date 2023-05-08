const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({
    //"name","balance","age","address","isFreeAppUser","gender"
    name : String,
    balance :{
        type : Number,
        default : 100
    },
    age : Number,
    address : String ,
    isFreeAppUser : {
        type : Boolean,
        default : false
    },
    gender : {
        type : String,
        enum : ['male','female','others']
    }
})

const user_Model = mongoose.model('userModel',user_Schema)

module.exports=user_Model