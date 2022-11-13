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
        var filterEmail = req.body.emailFilter
            //If email is whrited, search in DB
            if(filterEmail.length > 0){
                //var to search
                var emailAtDB = await UserModel.find({
                  "email": filterEmail
                })
                    //if exist any serched
                    if(emailAtDB.length > 0){  
                         var ijdeqw = "gh7ugh79ed321"
                      // res.send(` ${typefilterEmail}`)
                    res.render("allUsers", { users: emailAtDB} )

                    } 
                    //if not exist
                    else if(emailAtDB.length == 0){
                      res.send(` Email pesquisado não encontrado `)
                    }
            }     
            //If not, create var with 'null'
            else {
              res.send(`Digite um email para pesquisar`)
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
// app.patch('/adm/users/update/:id', async(req,res)=>{
//     try{
//         const id = req.params.id
//         const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
//         return res.status(200).json(user)

//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }
// })

//To delete user
// app.delete('/adm/users/delete/:id', async(req,res)=>{
//     try{
//         const id = req.params.id
//         const user = await UserModel.findByIdAndRemove(id)

//         return res.status(200).json(user)
//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }
// })

//criar usuários
//utiliza Schema em outro arquivo para fazer
//  .post (não é .get)
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
                res.status(201).send(`Cadastro criado com email novo`)
              }
    }
    else{
      res.send(`Preencha TODOS os campos`)
    }                            
  } catch (error) {
    res.status(500).send(`ERRO: ${error.message}`);
  }
})

const port = 8081;
app.listen(port, () => {
  console.log(`rodando com EXPRESS na porta ${port}`);
});
