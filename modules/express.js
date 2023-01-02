const express = require("express");
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const cookieParser = require('cookie-parser');

      // authentication
      const passport = require('passport')
      const session = require('express-session')
            require('./auth')(passport)

            //function to be used for private routes
            function authenticationMiddleware(req, res, next){
                  if(req.isAuthenticated()){
                        next()
                  }                
                  else{
                        res.redirect('/login')
                  }
            }


const app = express();

 
//To be can possible use json in requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser())



//auth session 
app.use(session({
      secret:'123', //need to save apart
      resave: false, //save session for any request?
      saveUninitialized: false, //save anonymous session?
      cookie: { maxAge: 60 * 60 * 1000 } ,  //min * sec * msec
}))


 
            app.use(passport.initialize())
            app.use(passport.session())



//View Engine - EJS
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/img', express.static(__dirname+'public/img'))

app.set("views", "src/views");
app.set("view engine", "ejs");




//===========   ROUTES  ============

      //============  Home  ===============

      app.get("/", (req, res) => {
      res.status(200).render("home");
      });                     

      //============  login  ===============

      var loginRoute = require('../routes/login')
      app.use('/login', loginRoute) 

      //============  logout  ===============

      var logoutRoute = require('../routes/logout')
      app.use('/logout', logoutRoute)  
            
      //============  shop  ===============

      var shopRoute = require('../routes/shop')
      app.use('/shop', shopRoute)

      //============  adm  ===============

      var admRoute = require('../routes/adm')
      app.use('/adm', admRoute)


      //============  user  ===============

      var userRoute = require('../routes/user')
      app.use('/user', authenticationMiddleware, userRoute) //private route






//FALTA APLICAR:
      //  Validação usuário
      //  Data Bases ( ADM / PEDIDOS )
      //  Vincular DB pedidos a usuários

//CORRIGIR:
      //  login - bug css 


 


 


const PORT = 8081;
app.listen(PORT, () => {
  console.log(`rodando com EXPRESS na porta ${PORT}`);
});
