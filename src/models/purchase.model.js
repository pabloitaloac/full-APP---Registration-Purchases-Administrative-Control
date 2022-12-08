const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    products:{
        type: Array,
        required: true
    },
    qtd: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    image: {
        typ:String,
    }
})

const PurchaseModel = mongoose.model('Purchase', purchaseSchema)

module.exports = PurchaseModel