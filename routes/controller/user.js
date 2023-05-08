const user = require('../../model/user')

const create_User = async(req,res)=>{
    const data = req.body
    if(!data)return res.status(400).send({Msg : 'Please Enter Details'})
    let arr = ["name","age","address","gender"]
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send({Msg : `${arr[i]} is mandatory`})
    }
    
    const arrayOfData = [data]
    arrayOfData.map(x => x.isFreeAppUser = req.isFreeAppUser)
    const creator = await user.create(data)
    const finder = await user.find().count()
    return res.status(201).send({User_Created : creator  , totalDocuments : finder })
}
module.exports.create_User=create_User