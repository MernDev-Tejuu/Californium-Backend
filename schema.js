const mongoose =require('mongoose')

const bookSchema = new mongoose.Schema({
 bookName : {type: String,
             required:true
            },
 authorName : {type : String,
              required : true
              },
category    : {type : String,
              required : true  
            },
year : {
    type : Number,
    required : true
}                         

},{timeStamps:true})

const book = mongoose.model('DATA',bookSchema)

module.exports=book 

//const userSchema = new mongoose.Schema({
    // ^TypeError: mongoose.Schema is not a constructor

    // Im getting this error 
    
    //Ans : This error was occuring due to importing the address of mongo instead of require('mongoose') i did require('../mongoose/DB')