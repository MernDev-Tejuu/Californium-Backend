const order = require('../../model/order')
const product = require('../../model/product')
const user = require('../../model/user')
const mongoose = require('mongoose')

const create_Order = async (req,res)=>{
//  Validation:1 Access request body
    const body = req.body
//  Validation:2 Checking whether each property present or not in body
    let arr = ['userId','productId','date']
    for(i=0;i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(400).send({warning : `${arr[i]} is mandatory` })
    }
//  Validation: 3 Destructuring productId & userId from body    
    const {productId,userId}=body
//  Validation: 4 Checking whether objectId's are valid   
    if(!mongoose.Types.ObjectId.isValid(productId) )
    return res.status(400).send({warning : 'please enter valid productId'})
    if(!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).send({warning : 'please enter valid userId'})
//  Validation : 5 Checking Whether productId & userID are present      
    const finder1 = await product.findById(productId)
    const finder2 = await user.findById(userId)
    if(finder1===null)return res.status(400).send({Msg : 'ProductId Is Not Present'})
    if(finder2===null)return res.status(400).send({Msg : 'userId Is Not Present'})

    const arrayOfBody = [body]
    const reqHead = req.isFreeAppUser
        console.log(typeof reqHead)
//  Validation : 6 checking the value of header 
//  If value is false add the header value in body isFreeAppUser & set amount to 
//  the  product price but only if user has sufficient balance for that product 
  if(reqHead==='false'){
    const{balance}=finder2
    const{price}=finder1
    
    if(balance<price)  
    return res.status(422).send({Msg : `Failed Due to Insufficient balance`})
    body.isFreeAppUser = reqHead
    body.amount = price 
    const creator = await order.create(body)
    const finder3 = await order.find().count()
    return res.status(201).send({Order_Created : creator,totalDocuments:finder3})
    }else if(reqHead==='true'){
        const insertion = arrayOfBody.map(x => x.isFreeAppUser=reqHead)
        arrayOfBody.push(insertion)
        const creator = await order.create(body)
       return res.status(201).send({Order_Created : creator})
    }
}

module.exports.create_Order=create_Order