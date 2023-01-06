
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const PurchaseModel = require('../src/models/purchase.model')
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


//Edit user by himself

router.post('/edit/:id', async (req,res)=>{
  try{
    const id = req.params.id
    const user = await UserModel.findById(id)

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
                var emailUpdate = req.body.emailUser
                var passwordUpdate = req.body.passwordUser

console.log(firstNameUpdate + ' ' + lastNameUpdate + ' ' + emailUpdate + ' ' + passwordUpdate);

              //if all OK, creat new user

                    // HASHING PASSWORD + Create User
                    bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(passwordUpdate, salt, async function(err, hash) {
                        // Store hash in the database                              
                        const passwordHashed = hash

                        const user = await UserModel.findByIdAndUpdate(id, {
                          firstName:firstNameUpdate, 
                          lastName: lastNameUpdate,
                          email: emailUpdate,
                          password: passwordHashed
                        }, {new: true})

                        console.log(passwordHashed);
                        console.log(user);

                        return res.status(200).render('userUpdatedByHinself',{userByID: user})

                    })                                        
                  }) 

            }
            catch(error){
                res.status(500).send(error.message)
            }
        })



// DELETE
// ------------------------------------------------------            
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
// ------------------------------------------------------            









// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS
// UNDER CONSTRUCTIONS 


router.get('/pedidos', (req,res)=>{
    var userID = req.cookies.userID

    res.redirect(`/user/${userID}/pedidos`)


})



router.get('/:id/pedidos', (req,res)=>{
    var id = req.params.id

    // forcing purchase data
var purchases = [ {
      productName: 'Arroz',
      qtd: 12,
      price: 9.12,
      adress: 'Rua xxx',
      paymentMethod: 'creditCard',
      img: 'https://www.clubeextra.com.br/img/uploads/1/218/528218.jpg',
      date: '30/08/2021 - 21:43hrs',
      purchaseStatus: "entregue",
      deliveryDate: '30/08/2021 - 22:32hrs',
      id: '01',
    
      },
      {
      productName: 'Feijão',
      qtd: 43,
      price: 29.43,
      adress: 'Rua PPP',
      paymentMethod: 'PIX',
      img: 'https://www.clubeextra.com.br/img/uploads/1/297/10723297.jpeg',
      date: '01/10/2020 - 09:56hrs',
      purchaseStatus: "cancelado",
      deliveryDate: null,
      id: '02',

    
    
      }
     ]


    res.render('./users/userPurchases', {id:id, purchases:purchases})
})





router.get('/:userID/pedidos/:purchaseID', async (req,res)=>{
      var userID = req.params.userID
      var purchaseID = req.params.purchaseID

      // const singlePurchase = await PurchaseModel.findById(purchaseID)

      const singlePurchase = {
        productName: 'Arroz',
        qtd: 12,
        price: 9.12,
        adress: 'Rua xxx',
        paymentMethod: 'creditCard',
        img: 'https://www.clubeextra.com.br/img/uploads/1/218/528218.jpg',
        date: '30/08/2021 - 21:43hrs',
        purchaseStatus: "entregue",
        deliveryDate: '30/08/2021 - 22:32hrs',
        id: '01',
      
        }
  

      //  res.render('./users/singlePurchase', {singlePurchase: singlePurchase})
       res.render('./users/singlePurchase', {singlePurchase: singlePurchase})




})


// ===============================


router.get('/:userID/checkout', (req,res)=>{

  console.log(' ====== GET checkout ======');

  // com ID
  var userID = req.params.userID

  console.log(`userID: ${userID}`);


  res.render('./users/checkout.ejs')

})


          router.post('/:userID/checkout', (req,res)=>{

            // to set the cart to server, if ID is not defined

            console.log(' ====== entrou no checkout ======');

            // com ID
            var cart = req.body.cart
            var userID = req.params.userID

            console.log(`userID: ${userID}`);
            console.log(`cart: ${cart}`);

            res.send()
                      
          })



























module.exports = router