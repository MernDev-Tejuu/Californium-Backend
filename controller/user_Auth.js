const jwt =require('jsonwebtoken')
const user_Auth = require('../../model/user_Auth')
const mongoose = require('mongoose')
const create_User = async(req,res)=>{
    const data = req.body
    if(!data)
    return res.status(400).send({msg : `Please Fill In Request Body`})
    const arr = ['firstName','lastName','mobile','emailId','password','gender','age']
    for(i=0;i<arr.length;i++){
    if(!data.hasOwnProperty(arr[i])){
        return res.status(422).send({msg  : `${arr[i]} is Mandatory`})
    } }
    const {emailId,mobile}=data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : `emailId is invalid`})
    if(!mobile.length >= 10)
    return res.status(400).send({msg : `Mobile Number is invalid`})
    const finder = await user_Auth.findOne({$or : [{emailId},{mobile}]})
    if(finder === null){
        const creator = await user_Auth.create(data)
        return res.status(201).send({User_Created : creator})
    }else if(finder.emailId == emailId ){
        return res.status(409).send({msg : `emailId Has Already been registered`})
    }else if(finder.mobile == mobile){
        return res.status(409).send({msg : `Mobile Has Already been registered`})

    }else{
        return res.send('something went wrong')
    }
}

const user_Token_Creation = async(req,res)=>{
    const {emailId , password} = req.body
    if(!emailId)
    return res.status(400).send({msg : `Please provide emailId` })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : `emailId is invalid`})
    if(!password)
    return res.status(400).send({msg : `Please provide password`})
    //-------------------------------------------------------------
    const finder = await user_Auth.findOne({$or :[{emailId},{password}]})
    if(!finder > 0)
    return res.status(404).send({msg : `User Not Found`})
    const token = await jwt.sign({emailId},"secretekey")
    const verifyToken = await jwt.verify(token , "secretekey")
    if(!verifyToken)
    return res.status(422).send({msg : `token invalid`})
    finder.status = true
    finder.data.token = token
    return res.status(201).send({status : true , data : finder.data})
    // body.data.token = 

}

const getByparams = async(req,res)=>{
    return res.status(201).send({msg : `All Credentials are valid`})
}

const update_User = async (req,res)=>{
    const userId= req.userId
    const updation = await user_Auth.findOneAndUpdate({_id : userId},{$set : {firstName : "vidyut",lastName:"jammwal"}},{new:true})
    return res.status(201).send({message : `Data has been changed`,User_Updated : updation})
}

const delete_User =async(req,res)=>{
    const userId= req.userId
    const deletion   = await user_Auth.findOneAndUpdate({_id:userId} , {$set : {isDeleted : true}},{new:true})

    return res.status(201).send({message : `Data has been marked delete`,User_Deleted : deletion})
}
module.exports.delete_User=delete_User
module.exports.update_User=update_User
module.exports.getByparams=getByparams
module.exports.user_Token_Creation=user_Token_Creation
module.exports.create_User=create_User