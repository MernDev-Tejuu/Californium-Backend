const userBook = require('../../model/Book-Model')
const userAuthor = require('../../model/authorModel')
const createBook = async(req,res)=>{
    const data = req.body

    const arr = ['author_id','name','price','ratings']
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send(`${arr[i]} is required`)

    }
    const creation = await user.create(data)
    return res.status(201).send({msg : `Data created`, data : creation})
} 

const get_Books_gte_lte = async(req,res)=>{
    const finder = await userBook.find({price : {$gte :50,$lte :200}}).select({author_id:1,_id:0})
    if(finder <=0 )return res.status(404).send({msg : `No suck books with this price`})
    for(i=0;i<finder.length;i++){
    }
    const finder2 = await userAuthor.find(finder[i])
    const looper = finder2.map(x => x.author_name)
    return res.status(201).send({authorName : looper})
}
module.exports.get_Books_gte_lte=get_Books_gte_lte
module.exports.createBook=createBook