// Create passwords hash to save  
const bcrypt = require('bcryptjs')
const { Passport } = require('passport')
    // function to create is:
    // hashbcrypt.hashSync()

const LocalStrategy = require('passport-local').Strategy


const users = [{
    _id: 1,
    username: 'user',
    password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
    email: 'abcde@abc.com'
    }]



module.exports = function(passport){

    function findUser(username){
        return users.find(item => item.username === username)
    }


    function finUserById(_id){
        return users.find(item => item._id === _id)
    }

            // create cookie to save login at frontend
            passport.serializeUser((user,done) => {

                done(null, user._id)


            })

            passport.deserializeUser((id, done) =>{

                try{
                    const user = finUserById(id)
                    done(null, user)
                }
                catch(err){
                    console.log(err);
                }

            })
 

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) =>{

        try{
            const user = findUser(username)
            if(!user){
                return done (null, false)
            }
            else if(user){
                const isValid = bcrypt.compareSync(password, user.password)

                if(!isValid){
                    return done(null,false)
                }
                else if(isValid){
                    // return done(null, user)
                    var userID =  user._id
                    return userID
                }
            }
        }
        catch(err){
            console.log(err);
            return done(err, false)
        }
    } ))


}
