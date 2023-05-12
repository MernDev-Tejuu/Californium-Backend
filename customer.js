const mongoose = require('mongoose')

const customer_Schema = new mongoose.Schema({
//'address','firstName','emailId','lastName','mobileNumber','DOB','customerId'
    firstName : String,
    lastName : String,
    mobileNumber : {
        type:String,
        unique : true
    },
    DOB : Date,
    emailId : String,
    address : String,
    status:{
    type : String,
    default  : 'INACTIVE'
    },
    isDeleted:Boolean,
    customerId : Number
})
const customer_Model =mongoose.model('customer',customer_Schema)
module.exports=customer_Model