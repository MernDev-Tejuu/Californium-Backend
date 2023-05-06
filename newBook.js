const userBook = require('../../model/newBook')
const userAuthor = require('../../model/newAuthor')
const userPublisher = require('../../model/newPublisher')
const createBook = async(req,res)=>{
    const data = req.body
    let arr = ['name','author','price','ratings','publisher']
   for(i=0;i<arr.length;i++){
    if(!data.hasOwnProperty(arr[i])){
        return res.status(400).send({err : `${arr[i]} is required`})
    }

   }
   const{ author,publisher }=data
   if(author.length != 24 || publisher.length != 24)return res.status(400).send({err : 'Please provide a valid Id'})
   const finder1 = await userPublisher.findById(publisher)
   if(finder1 <= 0)return res.status(404).send({msg  :  'No publisher Present'})
   const finder2 = await userAuthor.findById(author)
   if(finder2 <= 0 ) return res.status(404).send({msg : 'no author present'})
   const creator = await userBook.create(data)
   const finder3  = await userBook.find().count()
   return res.status(201).send({Data_Created : creator , totalDocuments : finder3})
} 

const getAllBooks_Author = async(req,res)=>{
    const query = req.query.name
    const finderBook = await userBook.find().select({name : 1,_id:0})
    const maping = finderBook.map(x => x.name)
    if(!query) return res.status(400).send({err : 'Please write book name in query',BookNames :maping}) 

    const finder = await userBook.find({name : query}).populate("publisher").populate('author')
    if(finder <= 0)return res.status(404).send({msg : 'Not in a Book collection'})
    return res.send({msg  : finder})
}
module.exports.getAllBooks_Author=getAllBooks_Author
module.exports.createBook=createBook