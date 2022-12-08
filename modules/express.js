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
      //  Data Bases ( ADM / PEDIDOS )
      //  Vincular DB pedidos a usuários

//CORRIGIR:
      //  login - bug css 


 


 


const PORT = 8081;
app.listen(PORT, () => {
  console.log(`rodando com EXPRESS na porta ${PORT}`);
});
