const express = require("express");
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");

      // authentication
      const passport = require('passport')
      const session = require('express-session')
            require('./auth')(passport)

            //function to be used for private routes
            function authenticationMiddleware(req, res, next){
                  if(req.isAuthenticated()){    return next()}
                  else{
                        res.redirect('/login')
                  }
            }


const app = express();

      //auth session 
      app.use(session({
            secret:'123', //need to save apart
            resave: false, //save session for any request?
            saveUninitialized: false, //save anonymous session?
            cookie: { maxAge: 10 * 60 * 1000  }   //min * sec * msec

      }))

      app.use(passport.initialize())
      app.use(passport.session())


//To be can possible use json in requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//View Engine - EJS
app.set("view engine", "ejs");
app.set("views", "src/views");



//===========   ROUTES  ============

app.get("/", (req, res) => {
  res.status(200).render("home");
});

      //============  shop  ===============

      var shopRoute = require('../routes/shop')
      app.use('/shop', shopRoute)

      //============  adm  ===============

      var admRoute = require('../routes/adm')
      app.use('/adm', admRoute)

      //============  login  ===============

      var loginRoute = require('../routes/login')
      app.use('/login', loginRoute) 

      //============  user  ===============

      var userRoute = require('../routes/user')
      app.use('/user', authenticationMiddleware, userRoute) //private route






//FALTA APLICAR:
      //  Validação usuário
      //  Data Bases ( ADM / PEDIDOS )
      //  Vincular DB pedidos a usuários

//CORRIGIR:
      //  login - bug css 


 


 


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`rodando com EXPRESS na porta ${PORT}`);
});
