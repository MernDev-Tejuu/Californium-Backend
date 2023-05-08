const validation = async(req,res,next)=>{

    const specialInput = req.header("isFreeAppUser")

    if(!specialInput)return res.status(400).send({Msg : "Missing 'isFreeAppUser' header"})
    req.isFreeAppUser = specialInput
    
    next()

}

module.exports.validation=validation