const mongoose =require('mongoose')

const product_Schema = new mongoose.Schema({
    //'name','category','price','required'
   name : String,
   category : String,
    price : {
    type : Number,
    required : true
}
})
const product_Model = mongoose.model('product',product_Schema)
module.exports=product_Model