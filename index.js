const dotenv = require('dotenv')
dotenv.config()

const connectToDatabase = require ('./src/database/connect')
connectToDatabase()



        //REFERÊNCIAS - APRENDIZADO
            // const {Person} = require('./person')
            // const person = new Person('Pablo')
            // require('./modules/http')
            // const path = require('./modules/path')
            // console.log(person.sayMyName())
            // require('./modules/fs')

require('./modules/express')

















