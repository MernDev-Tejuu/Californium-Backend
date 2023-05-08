const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const order_Schema = new mongoose.Schema({
    //'userId','productId','date','amount'
    userId : ObjectId,
    productId : ObjectId,
    date : String,
    amount : {
        type : String, 
        default : '0'
    },
    isFreeAppUser : {
        type : Boolean,
        default : false
    }
})
const order_Model = mongoose.model('order', order_Schema)

module.exports=order_Model