
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const ProductModel = require('../src/models/product.model')
const passport = require('passport');
const { query } = require('express');
const mainAPP = require('../modules/express')
const auth = require('../modules/auth')
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser');
const path = require('path')

var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
 
router.use(cookieParser())




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
                        
                        res.render("allUsers", { users: emailAtDB} )
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
                      res.render("allUsers", { users: lastNameAtDB} )
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
                    res.render("allUsers", { users: firstNameAtDB} )
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
   
  
  //DELETE by himself - REDIRECT
  router.post('/deleteUser/:id', async(req,res)=>{
    try{
        const id = req.params.id
        const user = await UserModel.findByIdAndRemove(id)

        return res.status(200).render('userDeletedByHinself', {userByID: user})
    }
    catch(error){
        res.status(500).send(error.message)
    } 
  })


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
  
  // router.post('/update/users/:id',
  // passport.authenticate('local-edit', { failureRedirect:'/erronarotaadminedit'}),
    
  //   async (req,res)=>{


  //     try{
  //         const id = req.params.id
  //         var firstNameUpdate = req.body.firstNameUser
  //         var lastNameUpdate = req.body.lastNameUser
  //         var emailUpdate = req.body.emailUser
  //         var passwordUpdate = req.body.password
  
  
  
  //         // const user = await UserModel.findByIdAndUpdate(id, req.JSON, {new: true})
  //         const user = await UserModel.findByIdAndUpdate(id, {
  //           firstName:firstNameUpdate, 
  //           lastName: lastNameUpdate,
  //           email: emailUpdate,
  //           password: passwordUpdate
  //         }, {new: true})
  //         return res.status(200).render('userUpdated',{userByID: user})
  
  //     }
  //     catch(error){
  //         res.status(500).send(error.message)
  //     }









  //   //         var email = req.body.username
  //   //         var password= req.body.password
            
  //   //         const user = await UserModel.findOne({email:email})
  //   //             const userID = user.id
                
  //   //             // create cookie and set userID to knw if is logged
  //   //             res.cookie('userID',userID, { maxAge: 1 * 60 * 1000 });


  //   //         res.redirect(`/user/painel/${userID}`) 


                
  // })


// ---------------------------------




  router.post('/update/users/:id', async(req,res)=>{
      try{
          const id = req.params.id
          var firstNameUpdate = req.body.firstNameUser
          var lastNameUpdate = req.body.lastNameUser
          var emailUpdate = req.body.email
          var passwordUpdate = req.body.password
  
  
          console.log(`1: ${firstNameUpdate},1: ${lastNameUpdate},1: ${emailUpdate},1: ${passwordUpdate}`);
  
          // const user = await UserModel.findByIdAndUpdate(id, req.JSON, {new: true})
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
          res.render("addUser", {user: null});
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
                                      res.render("addUser", {errToAdd: 'email', firstName: firstNameClient, lastName: lastNameClient, email: null , password: passwordClient});
                                    }
                                    //Validate password - mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial
                                    else if(passwordClient.length < 8){
                                      res.render("addUser", {errToAdd: 'passwordLength', firstName: firstNameClient, lastName: lastNameClient, email: emailClient , password: null});
                                    }
                                    else if(!regex.exec(passwordClient))
                                    {
                                      res.render("addUser", {errToAdd: 'passwordCondictions', firstName: firstNameClient, lastName: lastNameClient, email: emailClient , password: null});
                                    }
                                    else { 
                                      //if all OK, creat new user

                                        // HASHING PASSWORD + Create User
                                          bcrypt.genSalt(10, async (err, salt) => {
                                                                          
                                          
                                          bcrypt.hash(passwordClient, salt, async function(err, hash) {
                                            // Store hash in the database
                                

                                            const passwordHashed = hash


                                                  const user = await UserModel.create({
                                                  firstName: req.body.firstName,
                                                  lastName: req.body.lastName,
                                                  email: req.body.email,
                                                  password: passwordHashed,
                                                  });


                                                res.status(201).redirect(`/user/painel/${user.id}`)
                                          
                                        })
                                        
                                      }) 
                                      
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
  router.get('/estoque', async (req,res)=>{

        const product = await ProductModel.find({})

    res.render('./adm/estoque', {estoque:product, isFilter: true})
  })

 
 

            router.post('/estoque', async (req,res)=>{

    // //Create tags to can search product
    var productTagFilter = req.body.filter
    //change special characteres and all in low case
    var auxproductFilter = productTagFilter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    productTagFilter = auxproductFilter
    // //excluding separators       

    // productTagFilter = auxproductFilter.split(/[\s,;.-]+/)

  
              
              const product = await ProductModel.find({                
                productTag: productTagFilter 
              })
              
// console.log(`Produto: ${product} / Filtro: ${productTagFilter}`);

            res.render('./adm/estoque', {estoque:product})

})

    

// ------------------------------------------------------            



router.get('/estoque/novo-produto', async (req,res)=>{
  res.render('./adm/newProduct', {estoque:null})


})

        //CREATE PRODUCT HERE
              router.post('/estoque/novo-produto', async (req,res)=>{

                //Create tags to can search product
                var productTag = []
                //change special characteres and all in low case
                var auxproductName = (req.body.productName).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                //excluding separators              
                productTag = auxproductName.split(/[\s,;.-]+/)  
                      
                // creating any possible match of words
                // use the first letter
                productTag.push(auxproductName[0])
                      //add the next letter to before, and create new tag
                      for(var i = 1 ; i < auxproductName.length ; i++) {
                            productTag.push((productTag[productTag.length-1])+(auxproductName[i]))
                      }
                    

                      const product = await ProductModel.create({
                          
                        productCode: req.body.productCode,
                        productName: req.body.productName,
                        productQtd: req.body.productQtd,
                        productCost: req.body.productCost,
                        productNormalPrice: req.body.productNormalPrice,
                        productSpecialPrice: req.body.productSpecialPrice,
                        productImage: req.body.productImage,
        

                        productTag: productTag,

                        });


                  // console.log(`Produco criado. Tags: ${productTag}`);
                  res.json(`Produco criado. Tags: ${productTag}`);

                  // res.render('./adm/singleProductEdit', {
                  //    product: product,
                  //    isNew: true
                  // })
              })


// ------------------------------------------------------            


router.get('/estoque/produto/:id', async (req,res)=>{

  var id = req.params.id
  
  var product = await ProductModel.findById(id)
  
              console.log(`Produto encontrado: ${product}`);

  res.render('./adm/singleProductEdit', {
    product: product,
    isNew: false
  })
})
 
        router.post('/estoque/produto/:id', async (req,res)=>{

            var id = req.params.id

            var productCode = req.body.productCode
            var productQtd = req.body.productQtd
            var productCost = req.body.productCost
            var productNormalPrice = req.body.productNormalPrice
            var productSpecialPrice = req.body.productSpecialPrice
                if(productSpecialPrice.length == 0){
                  productSpecialPrice = null
                }
            var productImage = req.body.productImage

         
          //Create tags to can search product
          var productTag = []
          //change special characteres and all in low case
          var auxproductName = (req.body.productName).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          //excluding separators              
          productTag = auxproductName.split(/[\s,;.-]+/)  
                
          // creating any possible match of words
          // use the first letter
          productTag.push(auxproductName[0])
                //add the next letter to before, and create new tag
                for(var i = 1 ; i < auxproductName.length ; i++) {
                      productTag.push((productTag[productTag.length-1])+(auxproductName[i]))
                }                                

console.log(`product name: ${auxproductName}`);
              
          var product = await ProductModel.findByIdAndUpdate(
            id,

            {

            productCode: productCode,
            productName: auxproductName,
            productQtd: productQtd,
            productCost: productCost,
            productNormalPrice: productNormalPrice,
            productSpecialPrice: productSpecialPrice,
            productImage: productImage,

 
            productTag: productTag,

            }
          )
                   
             
            console.log(`Produto atualizado: ${id}`);


        res.redirect(`/adm/estoque/produto/${id}`)
              
        })




router.get('/estoque/produto/deletar/:id', async (req,res)=>{

  var id = req.params.id


  const product = await ProductModel.findByIdAndDelete(id)

  res.send(`exclusão: ${product}`)
})

 


















module.exports = router