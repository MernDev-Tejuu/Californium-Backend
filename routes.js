const app = require('../index')

const auth_Controller = require('../middleware/auth')
const user_Auth3_Controller = require('./controller/user_Auth3')

// Roll no 15 JWT Generating/Validating/autharization session/auth-2_JWT
app.post('/create_Auth3',user_Auth3_Controller.create_User)
app.post('/login',user_Auth3_Controller.token_Auth)
app.get("/verify/:userId",user_Auth3_Controller.id_Token_Check)
app.put('/update',auth_Controller.autharisation,user_Auth3_Controller.update_Auth)
app.delete('/delete',auth_Controller.autharisation,user_Auth3_Controller.deletion)
module.exports=app             