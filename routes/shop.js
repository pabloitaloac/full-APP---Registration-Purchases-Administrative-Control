// var app = require('../modules/express')
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const ProductModel = require('../src/models/product.model')
var cookieParser = require('cookie-parser')
const session = require('express-session')
var LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch');
const cors = require('cors')




var router = express.Router()

router.use(cors())

//
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser())


router.post('/ajax', async (req, res)=>{

    console.log('entrou na rota');

    var valor1 = Number(req.body.valor1)
    var valor2 = Number(req.body.valor2)

        console.log(`valor1: ${valor1} | Valor2: ${valor2}`);

    const somatotal = valor1 + valor2
 

    res.send(String(somatotal))
})

router.post('/cart', async(req,res)=>{
    console.log('entrou no cart');

    // get params + change to number
    var itemCode =Number(req.body.itemCode)
    var itemQtd = Number(req.body.itemQtd)

    var tststss = `itemCode: ${itemCode} | itemQtd: ${itemQtd}`


    // change to string + send
    console.log(tststss);
    // res.send(tststss)

//////////////////////////////////////////////
    const id = req.cookies.userID



    // var atCart = await UserModel.findById(id)
    //     newCart = atCart.cart
            
    //     console.log(newCart);

    const user = await UserModel.findByIdAndUpdate(id, {
        cart:  itemCode
        // {itemCode: itemCode, itemQtd: itemQtd})
    })

    console.log('updated? ');
 

})

router.get('/', async (req,res)=>{     

        var product = await ProductModel.find({})

        
        res.render('./shop/SHOP2.ejs', {allProducts: product})



















        // var cookieCART = req.cookies['CART']

        // if(cookieCART == null || cookieCART == undefined || cookieCART == ''){
        //     res.cookie('CART', '' ,  { maxAge: 360 * 24 * 60 * 60 * 1000 })
        //     console.log('cookieCART criado');
        // }
        // else{
        //     console.log('cookie existente');
        // }

    // res.render('./shop/SHOP2.ejs', {allProducts: product})
})

module.exports = router 