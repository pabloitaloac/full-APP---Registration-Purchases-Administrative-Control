const mongoose = require('mongoose')

const connectToDatabase = async ()=>{
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pabloitaloac.ehihyoh.mongodb.net/database00?retryWrites=true&w=majority`, (error)=>{
        if(error){
            console.log(`Erro ao conectar ao banco de dados: ${error}`);
        }
        console.log(`Conexão ao Banco de Dados com SUCESSO!`);
    })
}


module.exports = connectToDatabase