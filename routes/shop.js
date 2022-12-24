// var app = require('../modules/express')
const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const ProductModel = require('../src/models/product.model')
var cookieParser = require('cookie-parser')


var router = express.Router()

//
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser())


router.get('/', async (req,res)=>{     

        var product = await ProductModel.find({})

        var cookieCART = req.cookies['CART']

        if(cookieCART == null || cookieCART == undefined || cookieCART == ''){
            res.cookie('CART', '' ,  { maxAge: 360 * 24 * 60 * 60 * 1000 })
            console.log('cookieCART criado');
        }
        else{
            console.log('cookie existente');
        }

    res.render('./shop/SHOP2.ejs', {allProducts: product})
})

module.exports = router 