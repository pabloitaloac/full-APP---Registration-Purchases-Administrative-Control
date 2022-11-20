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
        1:{
            nome:  'Chocolate',
            qtd: 12,
            img: 'https://www.paodeacucar.com/img/uploads/1/974/19514974.jpg',
            precoRegular: 10.90,
            precoPromocao: 7.20
            },
        2:{
            nome:  'Agua',
            qtd: 32,
            img: 'https://images-americanas.b2w.io/produtos/01/00/img7/01/00/item/1588123/0/1588123027_1GG.jpg',
            precoRegular: 4.30,
            precoPromocao: null
            },
        3:{
            nome:  'Arroz',
            qtd: 27,
            img: 'https://static.paodeacucar.com/img/uploads/1/771/529771.jpg',
            precoRegular: 6.30,
            precoPromocao: 3.87
            },
        4:{
            nome:  'Feijão',
            qtd: 24,
            img: 'https://pricemeter-image.s3.amazonaws.com/7898231920029.jpg',
            precoRegular: 9.90,
            precoPromocao: 5.10
            },
        5:{
            nome:  'Macarrão',
            qtd: 765,
            img: 'https://cdn.iset.io/assets/45763/produtos/903/galo_semola_espaguete_8_1kg.jpg',
            precoRegular: 4.60,
            precoPromocao: null
            },       
        6:{
            nome:  'Coca cola Lata',
            qtd: 765,
            img: 'https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/9/9/997463.jpg',
            precoRegular: 3.20,
            precoPromocao: 2.70
            },
        7:{
            nome:  'Miojo',
            qtd: 765,
            img: 'https://supernossoio.vtexassets.com/arquivos/ids/171364/Macarrao-Instantaneo-Nissin-Miojo-Galinha-Caipira-85g.jpg?v=637776855829330000',
            precoRegular: 3.70,
            precoPromocao: 2.10
            },
               
        }       

    res.render('./shop/shopHome.ejs', {allProducts: allProducts})
})

module.exports = router 