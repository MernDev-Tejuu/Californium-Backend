const userAuthor = require('../../model/authorModel')
const userBook = require('../../model/Book-Model')
const createNewAuthor = async(req,res)=>{
    const data = req.body
    
    const arr = ["author_id","author_name","age","address"]
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send({msg : `${arr[i]} is required`})
    }
    const creation = await user.create(data)//create
    return res.status(201).send({msg  :  'Data Created',data : creation})
}

const get_By_Author = async(req,res)=>{
    const name = req.query.name
    const finder = await userAuthor.find({author_name : name})
    if(!finder) return res.status(404).send({msg  : `${name} not found`})
    //The documents is in the form of array of object ,so used finder[0]
    const{author_id,author_name}=finder[0]
    const finder2 = await userBook.find({author_id:author_id })
    if(finder2 <= 0)return res.status(404).send({msg : `No Such Book Written by ${author_name}`})
    if(!finder2) return res.status(404).send({msg : `No Book Found with author_id :${finder.author_id} `})
    return res.status(201).send({msg : `About ${finder2.length} results found`,data : finder2})
}

const update_By_BookName = async(req,res)=>{
    //getting bookname from query 
    const name= req.query.name
    const change = req.query
    //Finding BookName using find() query
    const finder =await userBook.find({name})
    //Validation:1 if the given bookName does'nt present in DB
    if(finder <=0)return res.status(404).send({msg : `No Book Present,Try another book`})
    //If BookName Found ,Will destruct author_id 
    console.log(finder)
    const{author_id}=finder[0]//[0] why?? becoz document is in AO[Array Object]
    //Comparing (book author_id) with (author author_id)
    const finder2 = await userAuthor.find({author_id})
    //If no author_id matches wiht the book auhtor_id then error
    if(finder2<=0)return res.status(404).send({msg : 'No Author found'})
    console.log(finder2)
    //WE SEARCHING author_id JUST BECOUZ TO GET AUTHOR NAME 
    const{author_name}=finder2[0]
    //Now coming back to book , will update book price fro 50 to 100 or 200
    //using findOneAndUpdate query {firstquery is conditon} ,{second is the changes}
    const updateBook =await userBook.findOneAndUpdate({name},{$set :change},{new:true}) 
    return res.send({msg : `${name} writter Mr.${author_name} `,data : updateBook})
    
 }



module.exports.update_By_BookName=update_By_BookName
module.exports.get_By_Author=get_By_Author 
module.exports.createNewAuthor=createNewAuthor