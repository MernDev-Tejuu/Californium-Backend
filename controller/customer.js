const customer = require('../../model/customer')
const mongoose = require('mongoose')
const create_Customer = async(req,res)=>{
    try{
//Accessing Data From request body..        
    const body = req.body
//Stored Property names in string form     
    let arr = ['firstName','emailId','lastName','mobileNumber','DOB','address','customerId']
//Itterating each property strings  to check whether its present in the body or not   
    for(i=0;i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(422).send({msg : `${arr[i]} is mandatory`})
    }
//Destructuring properties from = body    
    const{emailId,mobileNumber,customerId}=body
//Validation:1 Checking Email is valid or not    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : 'Invalid email address. Please provide a valid email address in the format [example@example.com]."'})
    const finder = await customer.find({emailId})
//validation:2 Checking whether email already exist before creation     
    if(finder.length > 0)
    return res.status(422).send({msg : `EmailId is already exist`}) 
//Validation:3 Checking whether Mobile number is valid     
    if(mobileNumber.length <10 )
    return res.status(400).send({msg : 'Mobile is not valid '})
    const finder1 =  await customer.find({mobileNumber})
    //Checking Mobile is already present or not [Duplicate Key Error]    
    if(finder1.length > 0)
    return res.status(422).send({msg : `mobileNumber ${mobileNumber} is already exist`}) 
    const finder2 = await customer.find({customerId})
//Validation:4 Checks whether CustomerID has already present 
    if(finder2.length > 0)
    return res.status(422).send({msg : 'customerId already exist'})
//  All Validations Passed/ 
    const creator = await customer.create(body) 
//Counting number of documents being created
    const DocumentCount  = await customer.find().count()
    return res.status(201).send({Customer_Created : creator , totalDocuments : DocumentCount})    
}
    catch(err){
     return res.status(500).send({err : `Internal Error [${err.message}]`})
    }
}

const deleteCustomer = async(req,res)=>{
    try{
//Accessing Data From request query..        
    const query = req.query.ObjectId
//Asking User For ObjectID    
    if(!query)return res.status(422).send({msg : `please provide ObjectId`})
//validation:1 Testing whether given ObjectId is Valid or not    
    if(!mongoose.Types.ObjectId.isValid(query))
    return res.status(400).send({msg : `ObjectId is not valid`})

    const finder = await customer.findById(query)
  // Flag set to false
    finder.isDeleted=false
//Updating and making true    
    const finder1 = await customer.findOneAndUpdate({_id :query},{$set :{ isDeleted :true}},{new : true})
    return res.status(201).send({cust_Deleted : finder1})
    }
    catch(err){
        return res.status(500).send(`Internal Error [${err.message}]`)
    }
}
const get_Active_Customer=async(req,res)=>{
   try{ 
//Filter will send all documents which has status:'ACTIVE'    
    const finder = await customer.find({status:'ACTIVE'})
//Filter will send all documents, so will remove the documents which was deleted    
    const mapper = finder.filter(x =>  x.isDeleted===true)
     finder.splice(finder.indexOf(mapper),1)
//If No Active Customer Found     
    if(finder<=0)return res.status(200).send({msg :`No customer with Active status`})
    return res.status(200).send({all_Customer : finder})}
// Still if something went wring ,the it will handle catch error    
   catch(err){
    return res.status(500).send(`Internal Error [${err.message}]`)
   }
}
module.exports.get_Active_Customer=get_Active_Customer
module.exports.deleteCustomer=deleteCustomer
module.exports.create_Customer=create_Customer