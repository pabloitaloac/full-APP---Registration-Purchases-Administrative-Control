// var app = require('../modules/express')
const express = require('express')
const { Schema } = require('mongoose')


var router = express.Router()

//
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//

router.get('/', (req,res)=>{
    var allProducts = 
        {
            01:{
            'name': 'chocolate',
            'qtd': 12,
            'etc': 'dfklwf'
            },
            02:{
                'name': 'agua',
                'qtd': 32,
                'etc': '5t54tg45ty'
            }
        }
      

    res.render('./shop/shopHome.ejs', {allProducts: allProducts})
})

module.exports = router 