const app = require('../index')

const product_Controller = require('./controller/product')
const user_Middleware = require('../middleware/MW')
const user_Controller  = require('./controller/user')
const order_Controller = require('./controller/order')
//Roll no 11 session/middleware2
app.post('/product' , product_Controller.create_Product)
app.post('/user',user_Middleware.validation,user_Controller.create_User)
app.post('/order',user_Middleware.validation,order_Controller.create_Order)
module.exports=app        
