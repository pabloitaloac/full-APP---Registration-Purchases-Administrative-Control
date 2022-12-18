const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const { Schema } = require('mongoose')


// Create passwords hash to save  
const bcrypt = require('bcryptjs')
const { Passport } = require('passport')
    // function to create is:
    // hashbcrypt.hashSync()

    const LocalStrategy = require('passport-local').Strategy
    
    // abcABC123@@
 

// const users = [{
//     _id: 1,
//     username: 'user',
//     password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
//     email: 'abcde@abc.com'
//     },
//     {
//     _id: 2,
//     username: 'abcd',
//     password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
//     email: 'abcde@abc.com'
//     },
// ]

module.exports = function(passport){

    // function findUser(username){

    //     console.log(`username: ${username}`);

    //     // const user = await UserModel.findOne({ email: username });
    //     return user.find(item => item.username === username)
    // }


    // function finUserById(id){
    //     return users.find(item => item.id === id)
    // }


            // create cookie to save login at frontend
            
            
            passport.serializeUser((user,done) => {
                done(null, user.id)
            })

            passport.deserializeUser( async (id, done) =>{
                try{
                    // const user = finUserById(id)
                    const user = await UserModel.findById(id);
                    done(null, user)
                }
                catch(err){
                    console.log(err);
                }
            })
 
    
        
    passport.use(
    "local-login",
    new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    // async (email, password, done) =>{

    //     try{
    //         // check if user exists
    //         const user = findUser(email)
    //         if(!user){
    //             return done (null, false)
    //         }
    //         else if(user){
    //             const isValid = bcrypt.compareSync(password, user.password)

    //             if(!isValid){
    //                 return done(null,false)
    //             }
    //             else if(isValid){
    //                 return done(null, user)
    //             }
    //         }
    //     }
    //     catch(err){
    //         console.log(err);
    //         return done(err, false)
    //     }
    // } 

    async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username });
            if (!user) return done(null, false);
            const isMatch = await user.matchPassword(password);
                const id = user.id
            if (!isMatch){
                return done(null, false);
            }
            // if passwords match return user
            else {
                return done(null, user);
            }
        }
        catch (err) {
            console.log(err)
            return done(err, false);
        }
    }
    ))

    


}
