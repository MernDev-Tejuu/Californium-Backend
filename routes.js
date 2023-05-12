const app = require('../index')
const customer_Controller = require('./controller/customer')
const card_Controller = require('./controller/card')

//Roll no 13 jai Kisan
app.post('/customer',customer_Controller.create_Customer)
app.post('/card', card_Controller.create_Card)
app.get('/cards',card_Controller.getCards)
app.delete('/deleteCustomer',customer_Controller.deleteCustomer)
app.get('/activeCustomer',customer_Controller.get_Active_Customer)
module.exports=app        