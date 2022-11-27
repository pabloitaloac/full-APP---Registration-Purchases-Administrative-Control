
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");


var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
 
 




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
router.get('/login', async (req,res)=>{
  try{
    res.render('userLogin', {situation: null, userEmail:null, userPassword:null, isTriedUserPanel:null})      

  } 
  catch(error){
      res.status(500).send(error.message)
  }
})

      //Validate Login
      router.post('/login', async (req,res)=>{
        try{
          const email = req.body.username
          const senha = req.body.password
          const user = await UserModel.findOne({email:email, password:senha})

          //user not match - render with writed values
          if(user == null){
            res.render('userLogin', {situation: 'notMatched', userEmail:email, userPassword:senha, isTriedUserPanel:null} )
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
        const id = req.body.id
        const user = await UserModel.findById(id)

          if(id ==null){
            res.render('userLogin', {situation: null, userEmail:null, userPassword:null, isTriedUserPanel: true})

          } else{
            res.redirect(`/adm/painel/${id}`)
          }
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


module.exports = router