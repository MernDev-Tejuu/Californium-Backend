const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const card_Schema = new mongoose.Schema({
//'cardNumber','cardType','cardName','status','vision','customerId'    
    cardNumber : String,
    cardType : String,
    cardName : String,
    status :{
        type : String,
        default  : 'INACTIVE'
        },
    vision : String,
    customerId :{
        type : ObjectId,
        ref:"customer"
    }
})
const card_Model = mongoose.model('card',card_Schema)
module.exports=card_Model