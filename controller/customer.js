const customer = require('../../model/customer')
const upperCase =require('upper-case')
const mongoose = require('mongoose')
const create_Customer = async(req,res)=>{
    try{const body = req.body
    let arr = ['firstName','emailId','lastName','mobileNumber','DOB','address','customerId']
    for(i=0;i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(422).send({msg : `${arr[i]} is mandatory`})
    }
    const{emailId,mobileNumber,customerId}=body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : 'Invalid email address. Please provide a valid email address in the format [example@example.com]."'})
    const finder = await customer.find({emailId})
    console.log(finder.length )
    if(finder.length > 0)
    return res.status(422).send({msg : `EmailId is already exist`}) 
    if(mobileNumber.length <10 )
    return res.status(400).send({msg : 'Mobile is not valid '})
    const finder1 =  await customer.find({mobileNumber})
    console.log(finder1)
    if(finder1.length > 0)
    return res.status(422).send({msg : `mobileNumber ${mobileNumber} is already exist`}) 
    const finder2 = await customer.find({customerId})

    console.log("count" ,finder2.length)
    if(finder2.length > 0)
    return res.status(422).send({msg : 'customerId already exist'})
    // return res.send(`Created`)
    const creator = await customer.create(body) 
    const DocumentCount  = await customer.find().count()
    return res.status(201).send({Customer_Created : creator , totalDocuments : DocumentCount})    
}
    catch(err){
     return res.status(500).send({err : `Internal Error [${err.message}]`})
    }
}

const deleteCustomer = async(req,res)=>{
    try{const query = req.query.ObjectId

    if(!query)return res.status(422).send({msg : `please provide ObjectId`})
    if(!mongoose.Types.ObjectId.isValid(query))
    return res.status(400).send({msg : `ObjectId is not valid`})
    const finder = await customer.findById(query)
     finder.isDeleted=false
    const finder1 = await customer.findOneAndUpdate({_id :query},{$set :{ isDeleted :true}},{new : true})
    return res.status(201).send({cust_Deleted : finder1})
    }
    catch(err){
        return res.status(500).send(`Internal Error [${err.message}]`)
    }
}
const get_Active_Customer=async(req,res)=>{
   try{ const finder = await customer.find({status:'ACTIVE'})
    const mapper = finder.filter(x =>  x.isDeleted===true)
     finder.splice(finder.indexOf(mapper),1)
    if(finder<=0)return res.status(200).send({msg :`No customer with Active status`})
    return res.status(200).send({all_Customer : finder})}
   catch(err){
    return res.status(500).send(`Internal Error [${err.message}]`)
   }
}
module.exports.get_Active_Customer=get_Active_Customer
module.exports.deleteCustomer=deleteCustomer
module.exports.create_Customer=create_Customer