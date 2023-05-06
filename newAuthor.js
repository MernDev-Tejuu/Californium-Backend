const userAuthor = require("../../model/newAuthor")

const createAuthor = async (req,res)=>{
    try{const data = req.body 
    let arr = ["authorName","age","address","ratings"]
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send({err : `${arr[i]} is required`})
    }
    
    const creator = await userAuthor.create(data)
    const finder2 = await userAuthor.find().count()
    return res.status(201).send({Data_Created  :  creator,totalDocuments :finder2})}
   catch(err){
    return res.status(500).send(err.message)
   }
}
module.exports.createAuthor=createAuthor