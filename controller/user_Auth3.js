const user_Auth = require('../../model/user_Auth3')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const create_User  = async(req,res)=>{
    const body = req.body
    let arr = ["firstName","lastName","emailId","password","age","gender","mobile"]
    for(i=0 ; i<arr.length;i++){
        if(!body.hasOwnProperty(arr[i]))
        return res.status(422).send({msg : `${arr[i]} is mandatory`})
    }
    const{emailId,mobile}=body
    if(!mobile.length >=10)
    return res.status(422).send({msg : 'Mobile Is Not Valid'})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : `emailId is invalid`})
   const finder = await user_Auth.findOne({$or : [{emailId},{mobile}]})
   if(finder === null){
   const creator = await user_Auth.create(body)
   return res.status(201).send({User_Created : creator})
   }else if(finder.emailId === emailId){
    return res.status(409).send({msg : `EmailId Already Exist`})
}else if(finder.mobile === mobile){
return res.status(409).send({msg : `Mobile Already Exist`})
}
} 

const token_Auth = async (req,res)=>{
    const {emailId , password} = req.body
    if(!emailId)
    return res.status(400).send({message : `please Provide emailId` })
    if(!password)
    return res.status(400).send({message : `please Provide password` })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailId.match(emailRegex))
    return res.status(400).send({msg : `emailId is invalid`})
    const finder = await user_Auth.findOne({emailId})
    
    if(finder === null)
    return res.status(404).send({message : `Email does not exist`})
    const verifyPassword = await bcrypt.compare(password,finder.password)
    if(!verifyPassword)
    return res.status(403).send({message :`Invalid Password`})
    const tokenCreation = await jwt.sign({emailId},"shuuuu")

    if(!tokenCreation)
    return res.status(422).send({message : `token Creation failed`})
    const verifyToken = await jwt.verify(tokenCreation ,"shuuuu")
    //You stuck here ,below statement is cofrrect,check model has correct type
    finder.data.token = tokenCreation 
    return res.status(200).send({status :true ,data : finder.data})
}

const id_Token_Check = async(req,res)=>{
  try{  const userId = req.params.userId
    const token = req.header("x-auth3-token")
    
    if(!userId)
    return res.status(400).send({message : `Please Provide UserId`})
    if(!token)
    return res.status(400).send({message : `Please Provide Token`})
    if(!mongoose.Types.ObjectId.isValid(userId))
    return res.status(403).send({message :`userId Is Invalid`})
    const finder = await user_Auth.findById(userId)
    if(!finder > 0 )
    return res.status(404).send({message : `UserId Not Found`})

    const tokenVerify = await jwt.verify(token , "shuuuu",(err,decoded)=>{
        if(err){
           if(err.name === 'jsonWebTokenError'){
            return res.status(403).send({message : `Token is Invalid`})
        }else{
               return res.status(403).send({message : `Token is Invalid`})
            
            
            }
               
           }
        req.decoded = decoded 
    }) 
    const decoded_Data = req.decoded
    console.log(decoded_Data)
    const {emailId}=decoded_Data
    if(finder.emailId !== emailId)
    return res.status(422).send({message: `oops ! UserId Not Matches With Token`})
    return res.status(201).send({User_Data: `All Credentials are Working properly`})
} catch(err){
    return res.status(500).send({message: `Internal error [${err.message}]`})
}}

const update_Auth = async(req,res)=>{
    
    const auth_Data = req._id
    const password = req.query.password
    const data = req.query
    if(!Object.keys(data).length > 0)
    return res.status(400).send({message : `please Provide Query `})
    if(password ){
        const createPass = await bcrypt.hash(password,12)
        const comparePassW = await bcrypt.compare(password , createPass) 
        if(!comparePassW)
        return res.status(403).send({message : `Password could'nt Compare`})
         data.password = createPass
    }
    const updation = await user_Auth.findOneAndUpdate({auth_Data},{$set : data},{new:true})
    return res.status(201).send({message : `${Object.keys(data)} Has Been Updated`,Updated_User : updation})
    


}

const deletion = async(req,res)=>{
    const auth_Data = req._id
    const query = req.query.delete
    if(!query)
    return res.status(200).send({message : "Wanna Delete Your Document..Type delete : Yes in query"})
    if(query==="yes" || "Yes"){
    const delete_User = await user_Auth.findOneAndUpdate({auth_Data},{$set : {isDeleted : true}},{new:true})
    return res.status(201).send({message : "Your Document has Been Deleted",Deleted_User : delete_User})
    }else{
        return res.status(200).send({warning : 'Toh Kyu Aaya yaha...Nikal!!'})
    }
    

}
module.exports.deletion=deletion
module.exports.update_Auth=update_Auth
module.exports.id_Token_Check=id_Token_Check
module.exports.token_Auth=token_Auth
module.exports.create_User=create_User