const app = require('../index')
const user = require('../model/schema')
const mongoose =require('../mongoose/DB') 
const controller = require('../routes/controller/controller')
const bookController = require('./controller/bookController')
const bookManager = require('./controller/bookManager')
const book_control = require('../routes/controller/Book-Model')
const author_control = require('../routes/controller/authorController')
app.post('/createUser',controller.createUser)
app.get('/sol1',controller.sol1)
app.post('/createPlayer',controller.createPlayer)
app.post('/person',controller.personOperate)
//Roll no 4 Book Name
app.post('/bookCreation',bookController.createBook1) 
app.post('/bookCreation/get',bookController.getBooks)
//Roll no 5 Author name
app.post('/createAuthor',bookManager.createAuthor)
app.post('/getAuthor',bookManager.getAuthor)
app.post('/getByYear',bookManager.yearData)
app.get('/searchBook',bookManager.searchEntire)
app.get('/getByINR',bookManager.getByINR) 
app.get('/stockChecker',bookManager.stockChecker)
app.get('/practice/:page',bookManager.practice)
//ROll no 8 Mongo session 3
app.post('/createBook',book_control.createBook)//book creation
app.post('/createNewAuthor',author_control.createNewAuthor)//author Creation
app.get('/get_By_Author',author_control.get_By_Author)//get all books by it Author
app.put('/update_By_BookName',author_control.update_By_BookName)//update any property by its bookName
app.get('/get_Books_gte_lte',book_control.get_Books_gte_lte)
module.exports=app        