
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const { route } = require('./adm');
const passport = require('passport')
const mainAPP = require('../modules/express')
const auth = require('../modules/auth')
var cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');


var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
 
router.use(cookieParser())





  // ------------------------------------------------------            
  
// HOME users
router.get('/', async (req,res)=>{
  try{
    res.render('homeUser', {userByID: null})
  }
  catch(error){
      res.status(500).send(error.message)
  }
}) 

//LOGIN
// router.get('/login', async (req,res)=>{
//   try{
//     res.render('userLogin', {situation: null, userEmail:null, userPassword:null, isTriedUserPanel:null})      

//   } 
//   catch(error){
//       res.status(500).send(error.message)
//   }
// })

//       //Validate Login
//       router.post('/login', async (req,res)=>{
//         try{
//           const email = req.body.username
//           const senha = req.body.password
//           const user = await UserModel.findOne({email:email, password:senha})

//           //user not match - render with writed values
//           if(user == null){
//             res.render('userLogin', {situation: 'notMatched', userEmail:email, userPassword:senha, isTriedUserPanel:null} )
//           }
//           //redirect with id found
//           else{
//             var idUser = user.id
//             res.redirect(`/user/painel/${idUser}`)
//           }
//           // return res.status(200).json({user})
//         }
//         catch(error){
//             res.status(500).send(error.message)
//         }  
//         })
   



// ------------------------------------------------------            
// ------------------------------------------------------            
// ------------------------------------------------------            


//Password lost - "Esqueci senha"
router.get('/login/redefinir', async (req,res)=>{
    try{
    res.render('esqueciSenha', {situation: null})
    }
    catch(error){
      res.status(500).send(error.message)
    }  
})

            // Validate email (req)
            router.post('/login/redefinir', async (req,res)=>{
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
                          res.redirect(`/login/redefinir/${idUser}`)
                        }    }
              catch(error){
                res.status(500).send(error.message)
              }  
            })


                              // Email exist - Search ID
                              router.get('/login/redefinir/:id', async (req,res)=>{
                                try{
                                  const id = req.params.id      
                                  const email = req.body.username

                                  const user = await UserModel.findById(id)

                                      res.render('newPassword', {id:id})
                                      }
                                catch(error){
                                    res.status(500).send(error.message)
                                }  
                              })

                                    // The check of password quality is at page
                                              // collect new password at "get" page, and change this
                                              router.post('/login/redefinir/:id', async (req,res)=>{
                                                try{

                                                  const id = req.params.id
                                                  const senha = req.body.password

                                                  const user = await UserModel.findByIdAndUpdate(id, {password:senha})                                                  
                                                    res.redirect(`/painel/${id}`)
                                                }               
                                                catch(error){
                                                    res.status(500).send(error.message)
                                                }  
                                              })


// ------------------------------------------------------            



 //USER PANEL
 router.get('/painel', async (req,res)=>{
  try{

            // Cookies if have been signed
            var userIDAtCookie = req.cookies.userID

            console.log(`userIDAtCookie: ${userIDAtCookie}`);

            if(!userIDAtCookie || userIDAtCookie == null || userIDAtCookie == undefined){
              res.redirect('/login')
            }
            else if(userIDAtCookie){
              res.redirect(`/user/painel/${userIDAtCookie}`)
            }


        // const id = req.cookies.userID.value

        //     console.log(id);


        // const user = await UserModel.findById(id)

        //   if(id ==null){

        //     res.send(`Erro. User não encontrado.`)

        //   } else{
        //     res.redirect(`/user/painel/${id}`)
        //   }
  }
  catch(error){
      res.status(500).send(error.message)
  } 
  })

              //Render if have ID
              router.get('/painel/:id', async (req,res)=>{
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
router.post('/edit/:id', async (req,res)=>{
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
          router.post('/updated/:id', async(req,res)=>{
            try{
                const id = req.params.id
                var firstNameUpdate = req.body.firstNameUser
                var lastNameUpdate = req.body.lastNameUser
                var emailUpdate = req.body.email
                var passwordUpdate = req.body.password

                // // generate salt
                // const salt =  bcrypt.genSalt(10);
                // // hash the password
                // const hashedPassword = bcrypt.hashSync(passwordUpdate, salt);

                //   console.log(hashedPassword);


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
        router.post('/delete/:id', async(req,res)=>{
          try{
              const id = req.params.id
              const user = await UserModel.findByIdAndRemove(id)
      
              return res.status(200).render('userDeletedByHinself', {userByID: user})
          }
          catch(error){
              res.status(500).send(error.message)
          } 
        })


// -------------------------------------------

router.get('/:id/pedidos', (req,res)=>{
    var id = req.params.id

    // forcing purchase data
var purchases = [ {
      productName: 'Arroz',
      qtd: 12,
      price: 9.12,
      adress: 'Rua xxx',
      paymentMethod: 'creditCard',
      img: 'data:image/jpeg;base64,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',
      },
      {
      productName: 'Feijão',
      qtd: 43,
      price: 29.43,
      adress: 'Rua PPP',
      paymentMethod: 'PIX',
      img: 'data:image/jpeg;base64,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',
      }
     ]


    res.render('./users/userPurchase', {id:id, purchases:purchases})
})



























module.exports = router