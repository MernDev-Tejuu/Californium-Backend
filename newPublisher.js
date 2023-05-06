const userPublisher = require('../../model/newPublisher')

const createPublisher = async(req,res)=>{
    try{const data = req.body
    let arr = ['name','headQuarter']
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send({err : `${arr[i]} is required`})
    }
    const creator = await userPublisher.create(data)
    const finder = await userPublisher.find().count()
    return res.status(201).send({Data_Created : creator , totalDocuments : finder})}
   catch(err){
    return res.status(500).send(err.message)
   }
}
module.exports.createPublisher=createPublisher