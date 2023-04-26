const user = require('../../model/schema')
const createBook = async (req,res)=>{
    const body = req.body
    const requiredField = ['bookName' ,'authorName' ,'category','year']
    for(i=0;i<requiredField.length;i++){
        if(!body.hasOwnProperty(requiredField[i]))
        
        return res.status(400).send(`${requiredField[i]} is required`)
    }
    
    const creation = await user.create(body) 
    return res.status(201).send('You are succesully registered as author')
}
 
const getBooks = async (req,res)=>{  
    const data = req.query.search
    const finderr = await user.find({bookName:data})
    return res.status(200).send(finderr)
}
module.exports.getBooks=getBooks
module.exports.createBook=createBook


//https://github.com/MernDev-Tejuu/backend-WebApp.git
//https://github.com/MernDev-Tejuu/backend-WebApp.git