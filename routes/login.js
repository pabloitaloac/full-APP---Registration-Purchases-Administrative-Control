const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const { route } = require('./adm');
const passport = require('passport');
const { query } = require('express');
const mainAPP = require('../modules/express')
const auth = require('../modules/auth')

var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());



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

router.get('/', async (req, res, next)=>{

    // var email = await req.body.username
    // var senha = await req.body.password

    if(req.query.fail){ 
        
        res.render('userLogin', {message: 'user não encontrado!'})
    }
    else{
        res.render('userLogin', {message: null, userEmail:null, userPassword:null})
        
        
    }
    
}) 

router.post('/', passport.authenticate('local', {
    successRedirect: `/user/painel`,    
    failureRedirect: `/login?fail=true`,
    
    })
) 



module.exports = router   