const app = require('../index')

const user_Auth_Controller =require('./controller/user_Auth')
const auth_Controller = require('../middleware/auth')


//Roll no 14 JWT Generating/Validating session/auth-1_JWT
app.post('/userAuth',user_Auth_Controller.create_User) 
app.post('/getUser',user_Auth_Controller.user_Token_Creation)
app.get('/getByParams/:userId',auth_Controller.auth_Validating,user_Auth_Controller.getByparams)
app.put('/updateAuth/:userId',auth_Controller.auth_Validating,user_Auth_Controller.update_User)
app.delete('/deleteUser/:userId',auth_Controller.auth_Validating,user_Auth_Controller.delete_User )
module.exports=app             