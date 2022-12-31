// var app = require('../modules/express')
const express = require('express')
const { Schema } = require('mongoose')
const UserModel = require("../src/models/user.model");
const ProductModel = require('../src/models/product.model')
var cookieParser = require('cookie-parser')
const session = require('express-session');
const { json } = require('body-parser');





var router = express.Router()


//
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser())


// router.post('/ajax', async (req, res)=>{
    
    //     console.log('entrou na rota');
    
    //     var valor1 = Number(req.body.valor1)
    //     var valor2 = Number(req.body.valor2)
    
    //         console.log(`valor1: ${valor1} | Valor2: ${valor2}`);
    
    //     const somatotal = valor1 + valor2
 
    
    //     res.send(String(somatotal))
    // })

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
    






router.post('/cart/addProduct', async(req,res)=>{
    console.log('entrou no cart');

    // get params + change to number
    var itemCode =Number(req.body.itemCode)
    var itemQtd = Number(req.body.itemQtd)




//////////////////////////////////////////////
const id = req.cookies.userID

if(id){
     
    // What is in the Cart?
    var atCart = await UserModel.findById(id)
        var newCart = atCart.cart
        
        if(newCart == [] || newCart == null || newCart == undefined || newCart == ''){

            // push new product
            newCart.push([itemCode,itemQtd])

            console.log(newCart);

                // update with new info
                const user = await UserModel.findByIdAndUpdate(id, {
                    cart:  newCart
                })  
            
                console.log(`New cart is: ${user.cart}`); 

            return res.send(`Novo produto adicionado ao carrinho vazio`)

        }
        else{
            
            for(var i = 0 ; i < newCart.length ; i++){
    


                if(newCart[i][0] == itemCode){
                    console.log('É ESSE item');

                    console.log(`qtd antiga = ${newCart[i][1]} `);
                    // if exist, add the new Quantity to the last
                    newCart[i][1] = newCart[i][1] + itemQtd
                    console.log(`novo qtd = ${newCart[i][1]} `);


                    console.log(newCart);

                    // SAVE TO CART = = = = = =
                        const user = await UserModel.findByIdAndUpdate(id, {
                            cart:  newCart
                        }) 
                    
                        console.log(`New cart is: ${user.cart}`); 



                    return res.send(`Produto existente atualizado`)

                }

            }


            
             
        } 
        
        if(itemCode != newCart[newCart.length - 1][0]){

            console.log(`Item não encontrado`);

            newCart.push([itemCode,itemQtd])

            console.log(newCart);

                // update with new info
                const user = await UserModel.findByIdAndUpdate(id, {
                    cart:  newCart
                }) 
            
                console.log(`New cart is: ${user.cart}`); 
            

            return res.send(`Produto adicionado ao carrinho`)


        } 



            
    
    // update with new info
        // const user = await UserModel.findByIdAndUpdate(id, {
        //     cart:  newCart
        // }) 
    
        // console.log(`New cart is: ${user.cart}`); 
}  
else if(!id){

    console.log(' = = SEM ID = = ')
    
    return res.send(null)
}


// ==============================================

 
})

router.post('/cart/show', async(req,res)=>{
    console.log('está em cart/show');


    const id = req.cookies.userID

    if(id){
        console.log(id);

        var atCart = await UserModel.findById(id)
            var sendToClient = atCart.cart
            sendToClient = sendToClient.join('///')
            
            console.log(`sendToClient: ${sendToClient}`);

            if(sendToClient == null || sendToClient == 0 || sendToClient == undefined ){
                return res.send()
            }
            
               
             
            
            atCart.cart.forEach(async element => {
                var itemCode = element[0]
                
                var product = await ProductModel.find({productCode: itemCode})
            
            console.log(`preço do produto: ${product[0].productSpecialPrice}`)



        });


        return res.send(sendToClient)


    }
    else{
        console.log(' = = SEM ID. Cart apenas no Local Storage = = ')

        return res.send('NO ID')
    }

})



// ==================================

router.post('/cart/priceSingleProduct', async(req,res)=>{
    console.log(`consultando preço do produto ${req.body.itemCode}`);

    const itemCode = req.body.itemCode

    const product = await ProductModel.find({productCode: itemCode})
    
    var itemPrice = product[0].productSpecialPrice
    var itemName = product[0].productName

console.log(String(itemPrice)+'///'+String(itemName));
 

    res.send(String(itemPrice)+'///'+String(itemName))
 
   
})
 

// ==================================








router.post('/cart/empty', async(req,res)=>{
    console.log('Entrou em zerar carrinho');

    const id = req.cookies.userID

    if(id){
    
    // What is in the Cart?
    var atCart = await UserModel.findById(id)
        var newCart = atCart.cart

        newCart = []

    const user = await UserModel.findByIdAndUpdate(id, {
        cart: newCart

    })

    res.send('Carrinho zerado')

    }
    else{
        console.log(' = = SEM ID. Fazer login para acessar = = ')

        return res.send(' = = SEM ID. Fazer login para acessar = = ')
    }

})





module.exports = router 