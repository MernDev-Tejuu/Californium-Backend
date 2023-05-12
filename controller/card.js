const card = require('../../model/card')
const customer = require('../../model/customer')
const mongoose = require('mongoose')
const create_Card = async(req,res)=>{
  // Accessing Data from request body    
  try{  const body = req.body
  //Stored Each properties in an arr   
    let arr = ['cardNumber','cardType','cardName','status','vision','customerId']
  //Itterating over each property and checking whenther its present in body or not  
    for(i=0;i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(400).send({msg : `${arr[i]} is mandatory`})
    }
   //Destructuring properties from body 
    const{cardNumber,customerId}=body
    const finder = await card.find({cardNumber})
    console.log(finder.length)
//validation:1 Checking whether given cardNo already exist or not    
    if(!finder.length <= 0)
    return res.status(422).send({msg : `${cardNumber} already exist`})
//Validation:2 Checking whether customerId(ObjectID/d) is valid     
    if(!mongoose.Types.ObjectId.isValid(customerId))
    return res.status(400).send({msg : `Customer-ID is invalid `})
    //Checking ObjectId Using mongoose filter
    const finder2 = await customer.findById(customerId)
//Validation:3 Checks whether the document belongs to this Id is deleted or not    
   if(finder2.isDeleted===true)
   return res.status(422).send({msg : 'This Customer was deleted'})
    const finder3 = await card.findById(customerId)
//Validation:4 Checks whether card has already created using Object ID     
    if(!finder3 === null)
    return res.status(422).send({msg : `Customer already exist `})
   //  All Validations Passed    
    const creator = await card.create(body)
    return res.status(201).send({Card_Created : creator})
}
    catch(err){
    return res.status(500).send(`Internal Error [${err.message}]`)
}
}

const getCards = async(req,res)=>{
    const finder = await card.find().populate('customerId')
    return res.status(201).send({Card_Data :finder})
}

module.exports.getCards=getCards
module.exports.create_Card=create_Card