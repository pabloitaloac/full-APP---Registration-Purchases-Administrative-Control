const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    productCode: {
        type: String,
        required: true,
    },
    productQtd: {
        type: Number,
        required: true,
    },
    productCost : {
        type: Number,
        required: true,
    },
    productNormalPrice : {
        type: Number,
        required: true,
    },
    productSpecialPrice : {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
    },
    productTag: {
        type: Array,
    }
})


const ProductModel = mongoose.model('Products', productSchema)

module.exports = ProductModel