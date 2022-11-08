const express = require ("express")
const { findByIdAndUpdate } = require("../src/models/user.model")
const UserModel = require('../src/models/user.model')

const app = express()

 //To be can possible use json in requests
app.use(express.json())


//View Engine - EJS
app.set('view engine', 'ejs')
app.set('views', 'src/views')


//Routes
app.get('/', (req,res)=>{
    res.status(200).render('home')
})

app.get('/adm/users', async (req, res)=>{
    let users = await UserModel.find({})
    res.render('allUsers',{'users': users})
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
app.get('/adm/users/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const userByID = await UserModel.findById(id)

        res.status(200).render('singleUser',{'userByID': userByID})



    } catch(error){
        return res.status(500).send(error.message)
    }
})


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


//Adicionar usuários
app.get('/adm/add/users', async (req,res)=>{
    res.render('addUser')
})


        //Using url to receive json
        app.post('/adm/add/single_user', async (req,res)=>{
            try{
                const user = await UserModel.create(req.body)

                res.status(201).json(user) 
            }
            catch (error) {
                res.status(500).send(error.message)
            }

        })




const port = 8081
app.listen(port, ()=>{
    console.log(`rodando com EXPRESS na porta ${port}`)
})




