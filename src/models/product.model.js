const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        minlength: 1
    },
    productCode: {
        type: String,
        required: true,
        minlength: 1
    },
    productQtd: {
        type: Number,
        required: true,
        minlength: 1
    },
    productCost : {
        type: Number,
        required: true,
        minlength: 1
    },
    productNormalPrice : {
        type: Number,
        required: true,
        minlength: 1
    },
    productSpecialPrice : {
        type: Number,
        required: true,
        minlength: 1
    },
    productImage: {
        type: String
    }
})


const ProductModel = mongoose.model('Products', productSchema)

module.exports = ProductModel