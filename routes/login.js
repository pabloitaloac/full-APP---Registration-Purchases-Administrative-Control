const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const { route } = require('./adm');
const passport = require('passport');
const { query } = require('express');
const mainAPP = require('../modules/express')
const auth = require('../modules/auth')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser())



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


router.post('/',
    
    passport.authenticate('local-login', { failureRedirect:'/login?fail=true'}),
    
    async (req,res)=>{

            var email = req.body.username
            var password= req.body.password
            
            const user = await UserModel.findOne({email:email})
                const userID = user.id
                
                // create cookie and set userID to knw if is logged
                res.cookie('userID',userID, { maxAge: 60 * 60 * 1000 });


            res.redirect(`/user/painel/${userID}`) 


                
    }
    )




// -------------------------------------------

//Password lost - "Esqueci senha"
router.get('/redefinir', async (req,res)=>{
    try{
    res.render('esqueciSenha', {situation: null, userEmail:null})
    }
    catch(error){
      res.status(500).send(error.message)
    }  
})

            // Validate email (req)
            router.post('/redefinir', async (req,res)=>{
              try{

                const email = req.body.username
                const user = await UserModel.findOne({email:email})

                      //user not match - render with writed values
                        if(user == null || user == undefined){
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
                              router.get('/redefinir/:id', async (req,res)=>{
                                try{
                                  const id = req.params.id      
                                //   const email = req.body.username

                                //   const user = await UserModel.findById(id)

                                      res.render('newPassword', {id:id})
                                      }
                                catch(error){
                                    res.status(500).send(error.message)
                                }  
                              })

                                    // The check of password quality is at page
                                              // collect new password at "get" page, and change this
                                              router.post('/redefinir/:id', async (req,res)=>{
                                                try{

                                                  const id = req.params.id
                                                  const senha = req.body.password


                                                //if all OK, creat new user

                                                // HASHING PASSWORD + Create User
                                                bcrypt.genSalt(10, async (err, salt) => {
                                                    bcrypt.hash(senha, salt, async function(err, hash) {
                                                        // Store hash in the database                              
                                                        const passwordHashed = hash
                                
                                                        const user = await UserModel.findByIdAndUpdate(id, {password:passwordHashed})

                                                        res.redirect(`/user/painel/${id}`)    
                                                    })                                        
                                                }) 
                      
                                                }               
                                                catch(error){
                                                    res.status(500).send(error.message)
                                                }  
                                              })




      


// -------------------------------------------

    
    


module.exports = router   