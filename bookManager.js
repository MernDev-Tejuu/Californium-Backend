const user = require('../../model/bookModel')

const createAuthor = async (req,res)=>{
    const body = req.body 
    const{_id ,authorName} =body
    const reqField = ['bookName','authorName','price','totalPages','stockAvailable','year']
    for(i=0;i<reqField.length;i++){
        if(!body.hasOwnProperty(reqField[i]))
        return res.status(400).send(`${reqField[i]} is required`)
    }
    const finder = await user.findOne({_id :_id })
    if(finder ) 
    return res.status(409).send({msgs : 'You are already a member'})
    const creation = await user.create(body)
    return res.status(200).send({msg : `Welcome ${authorName} in MongoDB`})
    //Created
}

const getAuthor = async(req,res)=>{
    const finder = await user.find()
    return res.send({data : finder})
}

const yearData = async (req,res)=>{
    const year = req.query.year
    const finder = await user.find({year :year})
    console.log(finder)
    if(finder<=0)return res.status(400).send({msg : `There is no such book published in [${year}]`})
    return res.status(200).send({data : finder})
}

const searchEntire = async(req,res)=>{
   try{ const condition = req.query
    const finder = await user.find(condition)
    console.log(finder)
    if(finder<=0)return res.status(404).send({msg : `There is no such ${Object.keys(condition)} published in ${condition.year}`})
    
    const counter = finder.length
    return res.status(200).send({msg :`About [${counter}] results found` ,data : finder})
}
 catch(err){
    return res.status(500).send({msg : err.message}) 
 }
}

const getByINR = async(req,res)=>{
    // const rupees = req.query.rupees
    const finder = await user.find({'price.indianRupees' : {$in:['33','890']}})
    return res.status(200).send({msg : `About [${finder.length}] results found`,Data : finder})
} 

const stockChecker = async(req,res)=>{
    
    const finder = await user.find({stockAvailable : true})
    if(finder===false)return res.send({msg : 'oops !! Out Of Stock'})
   return res.send({ msg : `About [${finder.length}] results found `,data : finder})
}

const practice = async (req,res)=>{
    const page = req.params.page
  const finder = await user.find().skip(4 * (page -1)).limit(4)
    if(finder<= 0)return res.status(404).send('No data found')
    return res.send({msg : `About [${finder.length}] results found`,data : finder})
}
module.exports.practice=practice
module.exports.createAuthor=createAuthor
module.exports.getAuthor=getAuthor
module.exports.yearData=yearData
module.exports.searchEntire=searchEntire 
module.exports.getByINR=getByINR
module.exports.stockChecker=stockChecker