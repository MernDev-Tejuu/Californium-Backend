const express = require('express')
const app = express()
app.use(express.json())
app.use('/',function(req,res,next){
    const data = new Date()
    
    console.log('Time :'+' '+data.getHours()+':'+
    data.getMinutes()+':'+
    data.getSeconds())
    console.log('Date :'+' '+data.getDate()+'/'+
    data.getMonth()+'/'+
    data.getFullYear())
    
    const ip = req.connection.remoteAddress
    console.log(ip)
    
    next()
})

const port = 4000 
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})


 
module.exports=app