const user_Auth_Model = require('../model/user_Auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose  = require('mongoose')

const auth_Validating = async(req,res,next)=>{
    //Implementing try_Catch
    try{
  //Access request body      
        const userId = req.params.userId
        console.log(userId)
//validation:1 Checking whether UserID provided or not        
        if(!userId)
        return res.status(400).send({msg : `Please Provide user Id `})
//validation:2 Checking whether token provided or not        
        const token =req.header('x-auth-token')
        if(!token)
        return res.status(400).send({msg : `Please Provide token`})
//validation:3 Checking whether userId is valid or not        
        if(!mongoose.Types.ObjectId.isValid(userId))
        return res.status(422).send({msg : `invalid user Id`})
//badic validation passed..
//finding userId in model        
        const finderDelete = await user_Auth_Model.findById(userId)
        if(!finderDelete > 0)
    //if not present sent an error message    
        return res.status(404).send({msg : `UserId Not present`})
        //detructuring email from finder data 
        const {emailId}=finderDelete
//validation 4 : Verifying token by haddling err 
//if theres an err then sent err        
        await jwt.verify(token,'secretekey',(err,payload)=>{
            if(err){ 
               return res.status(403).send({msg :" Invalid Token"})  
            }
            req.payload = payload
            
        })
        const decodeId = req.payload
        // console.log(decodeId)
//Compaaring findersEmail and decodedEmail whether matches,if not        
        if(emailId!==decodeId.emailId )
        return res.status(422).send({msg : `userId is not matching with token`})
    req.userId = userId

    //calling next function
    next()
    }
    catch(err){
        return res.status(500).send({err : `Internal Error [${err.message}]`})
    }
} 

module.exports.auth_Validating=auth_Validating