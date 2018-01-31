
const User = require('./../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt')

exports.create = (user, callback) => {
    // console.log(user)
    if (!user.username || !user.password) {
        return callback(null, 'username and password required')
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return callback(err)
        }
        user.password = hash
        console.log(user)
        let newUser = new User(user)
        newUser.save((err) => {
            callback(err, 'well done bb')
        })
        
    })
   
}

exports.find = (userId, callback) => {
    User.findOne({ _id: userId }, (err, user) => {
        callback(err, user)
    })
}

exports.update = (userId, newFields, callback)  => {
    User.findOne({ _id: userId}, (err, user) => {
        // console.log(user)
        user.set(newFields)
        user.save((err) => {
            // console.log(user) 
           console.log('User successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (userId, callback) => {
// console.log(userId)
    if (!userId) {
        return callback('right field necessary')
    }
    User.findOne({  _id: userId }, (err, user) => { 
        user.remove((err) => {
            callback(err)
            console.log('user removed')
            
        })
    })  
}

exports.login = (userLogin, callback) => {
    // console.log(userLogin)
    User.findOne({ username: userLogin.username }, (err, user) => { 
        if (err){
            return callback(err)
        }
        if (!user) {
            return callback(null, 'user not registered')
        }
        bcrypt.compare(userLogin.password, user.password, (err, res) => {
            if (err) {
                return callback(err)
            }
            if (res) {
                console.log(res)
                console.log(user)
                // console.log('User is registered in db')
                    callback(null, 'User is registered in db')
                 } else {
                // console.log('wrong password')
                    callback(null,'wrong password')
                }   
        })
    })
}




