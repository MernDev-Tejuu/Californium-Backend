const product = require('../../model/product')

const create_Product = async(req,res)=>{
    const data = req.body
    if(!data) return res.status(400).send({err : 'Please Put Details'})
    let arr = ['name','category','price']
    for(i=0;i<arr.length;i++){
        if(!data.hasOwnProperty(arr[i]))
        return res.status(400).send({err : `${arr[i]} is mandatory`})
    }
    const creator = await product.create(data)
    const finder = await product.find().count()
    return res.status(201).send({Data_Created : creator,totalDocuments :finder })

}
module.exports.create_Product=create_Product