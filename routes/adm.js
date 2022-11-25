
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");


var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
 
 
router.get('/', (req,res)=>{
    res.send('kflçwfw')
})

router.get("/users", async (req, res) => {
    let users = await UserModel.find({});
    res.render("allUsers", { users: users });
  });
  
      router.post('/users', async (req,res)=>{
   
        //Filter by email
          var filterEmail =  req.body.emailFilter
        //Filter by firstName
          var filterFirstName =  req.body.firstNameFilter
        //Filter by firstName
          var filterLastName =  req.body.lastNameFilter
  
              // If email is whrited, search in DB
              if(filterEmail.length > 0){
                  //var to search
                  var emailAtDB = await UserModel.find({
                    "email": filterEmail
                  })
                      //if exist any serched
                      if(emailAtDB.length > 0){  
                           
                      res.render("allUsers", { users: emailAtDB} )
   
                      } 
                      //if not exist
                      else if(emailAtDB.length == 0){
                        
                        // res.end()
                        
  
   
  
                        // res.send(` Email pesquisado não encontrado `)
                      }
              }   
  
              // If Last Name is whrited, search in DB   
              else if(filterLastName.length > 0){
                //var to search
                var lastNameAtDB = await UserModel.find({
                  "lastName": filterLastName
                })
                    //if exist any serched
                    if(lastNameAtDB.length > 0){  
                         
                    res.render("allUsers", { users: lastNameAtDB} )
      
                    } 
                    //if not exist
                    else if(lastNameAtDB.length == 0){
                      res.send(` Último Nome pesquisado não encontrado `)
                    }
            }
  
            // If First Name is whrited, search in DB   
            else if(filterFirstName.length > 0){
              //var to search
              var firstNameAtDB = await UserModel.find({
                "firstName": filterFirstName
              })
                  //if exist any serched
                  if(firstNameAtDB.length > 0){  
                       
                  res.render("allUsers", { users: firstNameAtDB} )
    
                  } 
                  //if not exist
                  else if(firstNameAtDB.length == 0){
                    res.send(` Primeiro Nome pesquisado não encontrado `)
                  }
          }
            
                
  
      })
       
          
        
  
  
  
  
              
   
        
   
  
  // router.get('/users', async (req,res)=>{
  //     try{
  //         const users = await UserModel.find({})
  //         res.status(200).json(users)
  //     }
  //     catch(error) {
  //         res.status(500).send(error.message)
  //     }
  
  // })
  
  //VISUALIZAR USUÁRIO - //To view user
  router.get("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const userByID = await UserModel.findById(id);
  
      res.status(200).render("singleUser", { userByID: userByID });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
   
  
  
  //To update user data
  // router.get('/update/users/:id', async(req,res)=>{
  //   try{
  //     const id = req.params.id;
  //     const userByID = await UserModel.findById(id);
  //       res.render('userUpdated', {userByID: userByID})
  
  //   }
  //   catch(error){
  //       res.status(500).send(error.message)
  //   }
  // })
  
  router.post('/update/users/:id', async(req,res)=>{
      try{
          const id = req.params.id
          var firstNameUpdate = req.body.firstNameUser
          var lastNameUpdate = req.body.lastNameUser
          var emailUpdate = req.body.emailUser
          var passwordUpdate = req.body.passwordUser
  
  
  
          // const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
          const user = await UserModel.findByIdAndUpdate(id, {
            firstName:firstNameUpdate, 
            lastName: lastNameUpdate,
            email: emailUpdate,
            password: passwordUpdate
          }, {new: true})
          return res.status(200).render('userUpdated',{userByID: user})
  
      }
      catch(error){
          res.status(500).send(error.message)
      }
  })
  
  //To delete user
  router.post('/delete/users/:id', async(req,res)=>{
      try{
          const id = req.params.id
          const user = await UserModel.findByIdAndRemove(id)
  
          return res.status(200).render('userDeleted', {userByID: user})
      }
      catch(error){
          res.status(500).send(error.message)
      } 
  })
  
  // ------------------------------------------------------            
  
  
  
  //criar usuários
        //utiliza Schema em outro arquivo para fazer
        //status 201 é padrão para confirmar criação de usuários
  
        //Page of ADD users - redirect to url to add effectivity users
        router.get("/add/users", async (req, res) => {
          res.render("addUser");
        });
  
                      // ADD - Using url to receive json
                      router.post("/add/single_user", async (req, res) => {
                        try {
  
                          var emailClient = req.body.email
                                  //If email is whrited, search in DB
                                  if(emailClient.length > 0){
                                    var validateEmailDB = await UserModel.findOne({
                                      "email": emailClient
                                    })      
                                  }
                                  //If not, create var with 'null'
                                  else {
                                    var validateEmailDB = null
                                  } 
  
                          var firstNameClient = req.body.firstName
                          var lastNameClient = req.body.lastName
                          var passwordClient = req.body.password
                          
                          // NÃO ESTÁ INDO ?/
                          var regex = /^(?=(?:.*?[A-Z]){3})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/
                          //Is all data complete? - Todos os campos escritos?
                          if(firstNameClient.length>0 && lastNameClient.length>0 && emailClient.length>0 && passwordClient.length>0){
                            
                                    // If yes, validate email and continue
                                    if (validateEmailDB != null && emailClient == validateEmailDB.email){
                                      res.send(`Email Existente!`)
                                    }
                                    //Validate password - mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial
                                    else if(passwordClient.length < 8){
                                        res.send(` senha deve conter no minímo 8 digitos!`)
                                    }
                                    else if(!regex.exec(passwordClient))
                                    {
                                        res.send(`A senha deve conter no mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial!`)
                                    }
                                    else {
                                        //if all OK, creat new user
                                        const user = await UserModel.create({
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        email: req.body.email,
                                        password: req.body.password,
                                        });
                                      res.status(201).redirect(`/user/painel/${user.id}`)
                                    }
                          } 
                          else{
                            res.send(`Preencha TODOS os campos`)
                          }                            
                        } catch (error) {
                          res.status(500).send(`ERRO: ${error.message}`);
                        }
                      })
     
  
  // ------------------------------------------------------            
  



module.exports = router