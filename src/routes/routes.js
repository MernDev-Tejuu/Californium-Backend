const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
app.use(cookieParser()); // import the CORS middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const controller = require("../controller/controller");
const Middleware = require("../middleware/midW");

//route handler⤵️

//----------------------------------------------------
app.post("/login", Middleware.authJWT, controller.getUser);
app.post("/register", controller.createUser1);
app.get("/about", Middleware.authenticate, controller.requestSender);
// app.get("/fetchName",controller.getUserbyQuery)
// app.get("/companyAccess", controller.getCompany  )
// --------------------------------------------------
//
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running at ${port}..`);
});
module.exports = app;
