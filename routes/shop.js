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

    res.render('./shop/SHOP2.ejs', {allProducts: product})
})

module.exports = router 