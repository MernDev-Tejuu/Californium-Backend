const mongoose = require ('mongoose')

const authorSchema = new mongoose.Schema({
    //"author_id","author_name","age","address"
    author_id : {
        type : Number,
        required :true
    },
    author_name : String,
    age : Number,
    address : String
})
const authorModel = mongoose.model('AUTHOR',authorSchema)

module.exports= authorModel