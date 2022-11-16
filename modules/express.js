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

//Routes
app.get("/", (req, res) => {
  res.status(200).render("home");
});

app.get("/adm/users", async (req, res) => {
  let users = await UserModel.find({});
  res.render("allUsers", { users: users });
});

    app.post('/adm/users', async (req,res)=>{

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
     
        
      




            
 
      
 

// app.get('/users', async (req,res)=>{
//     try{
//         const users = await UserModel.find({})
//         res.status(200).json(users)
//     }
//     catch(error) {
//         res.status(500).send(error.message)
//     }

// })

//VISUALIZAR USUÁRIO - //To view user
app.get("/adm/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userByID = await UserModel.findById(id);

    res.status(200).render("singleUser", { userByID: userByID });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
 


//To update user data
// app.get('/adm/update/users/:id', async(req,res)=>{
//   try{
//     const id = req.params.id;
//     const userByID = await UserModel.findById(id);
//       res.render('userUpdated', {userByID: userByID})

//   }
//   catch(error){
//       res.status(500).send(error.message)
//   }
// })

app.post('/adm/update/users/:id', async(req,res)=>{
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
app.post('/adm/delete/users/:id', async(req,res)=>{
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
      app.get("/adm/add/users", async (req, res) => {
        res.render("addUser");
      });

                    // ADD - Using url to receive json
                    app.post("/adm/add/single_user", async (req, res) => {
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


//                    //
//                    //
//-----USER PARTS-----//
//                    //
//                    //






// HOME users
app.get('/user', async (req,res)=>{
  try{
    res.render('homeUser', {userByID: null})
  }
  catch(error){
      res.status(500).send(error.message)
  }
}) 

//LOGIN
app.get('/user/login', async (req,res)=>{
  try{
    res.render('userLogin', {situation: null, userEmail:null, userPassword:null, isTriedUserPanel:null})      

  } 
  catch(error){
      res.status(500).send(error.message)
  }
})

      //Validate Login
      app.post('/user/login', async (req,res)=>{
        try{
          const email = req.body.username
          const senha = req.body.password
          const user = await UserModel.findOne({email:email, password:senha})

          //user not match - render with writed values
          if(user == null){
            res.render('userLogin', {situation: 'notMatched', userEmail:email, userPassword:senha}) 
          }
          //redirect with id found
          else{
            var idUser = user.id
            res.redirect(`/user/painel/${idUser}`)
          }
          // return res.status(200).json({user})
        }
        catch(error){
            res.status(500).send(error.message)
        }  
        })
    
//Password lost - "Esqueci senha"
app.get('/user/login/redefinir', async (req,res)=>{
    try{
    res.render('esqueciSenha', {situation: null})
    }
    catch(error){
      res.status(500).send(error.message)
    }  
})

            app.post('/user/login/redefinir', async (req,res)=>{
              try{

                const email = req.body.username
                const user = await UserModel.findOne({email:email})

                      //user not match - render with writed values
                        if(user == null){
                          res.render('esqueciSenha', {situation: 'notMatched', userEmail:email}) 
                        }
                        //redirect with id found
                        else{
                          var idUser = user.id
                          res.redirect(`/user/login/redefinir/${idUser}`)
                        }    }
              catch(error){
                res.status(500).send(error.message)
              }  
            })



    app.get('/user/login/redefinir/:id', async (req,res)=>{
      try{
        const id = req.params.id      
        const email = req.body.username


        //-------------------//
        //-------------------//
        //-------------------//
        //----Falta fazer----//
        //-------------------//
        //-------------------//
        //-------------------//


            //renderizar página de alteração
                //enviar valores da nova senha como post para mesma página

              res.send(id)

            }
      catch(error){
          res.status(500).send(error.message)
      }  
    })

    //change password
    app.post('/user/login/redefinir/:id', async (req,res)=>{
      try{

        const id = req.params.id
        const senha = req.body.password

        const user = await UserModel.findByIdAndUpdate(id, {password:senha})

          res.send('senha alterada')
      }               
      catch(error){
          res.status(500).send(error.message)
      }  
    })


// ------------------------------------------------------            



 //USER PANEL
 app.get('/user/painel', async (req,res)=>{
  try{
        const id = req.body.id
        const user = await UserModel.findById(id)

          if(id ==null){
            res.render('userLogin', {situation: null, userEmail:null, userPassword:null, isTriedUserPanel: true})

          } else{
            res.redirect(`/user/painel/${id}`)
          }
  }
  catch(error){
      res.status(500).send(error.message)
  } 
  })

              //Render if have ID
              app.get('/user/painel/:id', async (req,res)=>{
                try{
                  const id = req.params.id
                  const user = await UserModel.findById(id)

                  return res.status(200).render('userPanel', {userByID: user})
                }
                catch(error){
                    res.status(500).send(error.message)
                } 
                })

// ------------------------------------------------------            


//Edit user by himself
app.post('/user/edit/:id', async (req,res)=>{
  try{
    const id = req.params.id
    const user = await UserModel.findByIdAndUpdate(id)

    return res.status(200).render('userEdit', {userByID: user})
  }
  catch(error){
      res.status(500).send(error.message)
  } 
  })
          
        //Edit user by himself - REDIRECT
          app.post('/user/updated/:id', async(req,res)=>{
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
                return res.status(200).render('userUpdatedByHinself',{userByID: user})

            }
            catch(error){
                res.status(500).send(error.message)
            }
        })

      //DELETE by himself - REDIRECT
        app.post('/user/delete/:id', async(req,res)=>{
          try{
              const id = req.params.id
              const user = await UserModel.findByIdAndRemove(id)
      
              return res.status(200).render('userDeletedByHinself', {userByID: user})
          }
          catch(error){
              res.status(500).send(error.message)
          } 
        })


//FALTA APLICAR:
    //2a pagina de redefinir senha + validate


 

 


 


const port = 8081;
app.listen(port, () => {
  console.log(`rodando com EXPRESS na porta ${port}`);
});
