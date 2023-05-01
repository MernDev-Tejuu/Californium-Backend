const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName : {
        type : String,
        required : true
    },
    price : {
        indianRupees : {
            type : String,
            required : true
        },
        europeanRupees : {
            type :String,
            required :true
        }
    },
    year : {
        type :Number,
        default : 2011
    },
    tags :{
        type:[ String],

    },
    authorName:{
        type: String,
        required :true
    },
    
     sales : {
        type : Number,
        default : 0
     },
    totalPages : {
        type :Number,
        required:true
    },
    stockAvailable : {
        type : Boolean,
        required : true
    }
},{timestamps : true})

const bookModel = mongoose.model('BOOK',bookSchema)

module.exports=bookModel