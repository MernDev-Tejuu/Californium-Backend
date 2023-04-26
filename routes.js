const app = require('../index')
const user = require('../model/schema')
const mongoose =require('../mongoose/DB') 
const controller = require('../routes/controller/controller')
const bookController = require('./controller/bookController')
app.post('/createUser',controller.createUser)
app.get('/sol1',controller.sol1)
app.post('/createPlayer',controller.createPlayer)
app.post('/person',controller.personOperate)
//Roll no 4 Book Name
app.post('/bookCreation',bookController.createBook)
app.post('/bookCreation/get',bookController.getBooks)
module.exports=app        