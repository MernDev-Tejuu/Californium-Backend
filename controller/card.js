const card = require('../../model/card')
const customer = require('../../model/customer')
const mongoose = require('mongoose')
const create_Card = async(req,res)=>{
//    
  try{  const body = req.body
    let arr = ['cardNumber','cardType','cardName','status','vision','customerId']
    for(i=0;i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(400).send({msg : `${arr[i]} is mandatory`})
    }
    const{cardNumber,customerId}=body
    const finder = await card.find({cardNumber})
    console.log(finder.length)
    if(!finder.length <= 0)
    return res.status(422).send({msg : `${cardNumber} already exist`})
    if(!mongoose.Types.ObjectId.isValid(customerId))
    return res.status(400).send({msg : `Customer-ID is invalid `})
    const finder2 = await customer.findById(customerId)
   if(finder2.isDeleted===true)
   return res.status(422).send({msg : 'This Customer was deleted'})
    const finder3 = await card.findById(customerId)
    if(!finder3 === null)
    return res.status(422).send({msg : `Customer already exist `})
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