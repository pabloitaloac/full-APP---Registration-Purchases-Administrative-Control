const express = require("express");
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");


const app = express();


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

      //============  user  ===============

      var userRoute = require('../routes/user')
      app.use('/user', userRoute)






//FALTA APLICAR:
      //  Validação usuário
      //  Página de cadastro de produtos
      //  Data Bases ( ADM / PEDIDOS )
      //  Validações de form - edit Product
      //  Edit Product - BackEnd
      //  navBars with new functions

//CORRIGIR:
      //  login - bug css 


 


 


const port = 8081;
app.listen(port, () => {
  console.log(`rodando com EXPRESS na porta ${port}`);
});
