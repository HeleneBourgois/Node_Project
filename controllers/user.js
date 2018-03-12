
const User = require('./../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt')

exports.create = (user, callback) => {
    // console.log(user)
    if (!user.username || !user.password) {
        return callback(null, 'username and password required')
//ici return pour arreter l execution de la userCreate sinon la suite du script continue a sexecuter
//et une deuxieme callback est appele donc erreur 'cant set headers after they are sent: deux.send sont executés
//le front se rtrouve avec deux reponses pour une requete
//attention ici si je ne met pas null dans mon routeur il prendra le message comme premiere parametre alors que err est deja
//defini en tant que premiere parametre donc null necessaire quand besoin de decider de la place des parametres , false aussi functionne mais moins clean
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return callback(err)
        }
        user.password = hash
        console.log(user)
        let newUser = new User(user)
        newUser.createdAt = moment()
        newUser.save((err) => {
            callback(err, 'new user created')

        })
        
    })
   
}

// exports.find = (userId, callback) => {
// // get all the users
// // User
// // .find({ _id: userId })
// // .select('firstName')
// // .limit(10)
// // .exec((err, users) =>{
// // //.exec est utilise car remplace une callback lorsque tu veux
// // //rajouter un .populate , .limit, skip, sort, select ...
// // if (err) throw err;
// // })
// // // object of all the users
// // console.log(users);

// //READ ---- route GET
// User.findOne({ _id: userId }, (err, user) => {
// //ce user en parametre nexiste que dans la callback de findOne
// //findOne prend du temos comme toute action en BDD
// //user nexiste que dans la cllback donc si je lapelle en dehors il nexiste pas et surtout
// // la callback se sera effectuée avant que laction en bdd soit terminee
// //donc si la callback avait ete mise en dehors de findOne ca aurait été asynchrone car actions lancées en mm temps
// //ici puisque la callback se trouve dans la callback elle est appele une fois que laction en bdd est finie donc synchrones
// // console.log(user)
// callback(err, user)
// //si erreur ici cest mongo donc erreur serveur
// })
// }

exports.find = (userId, callback) => {
    User.findOne({ _id: userId }, (err, user) => {
        callback(err, user)
    })
}

exports.update = (userId, newFields, callback)  => {
    //ici les params sont le verre
// console.log(userId, newFields)
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
    //important de mettre condition sur param ou filter car sinon risque de suprresion de toute la bdd
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
            //err ne correspond que a une erreur de serveur donc erreur 500
        }
        //userLogin.username car objet userLogin et clef username donc obj.key pour avoir valeur
        if (!user) {
            let response = {
                authenticate: false,
                password: false
            }
            return callback(null, response)
        }
        bcrypt.compare(userLogin.password, user.password, (err, res) => {
            if (err) {
                return callback(err)
            }
            if (res) {
                console.log(res)
                console.log(user)
                // console.log('User is registered in db')
                let response = {
                    authenticate: true,
                    password: true,
                    id: user.id
                }
                callback(null, response)
            } else {
            // console.log('wrong password')
                let response = {
                    authenticate: true,
                    password: false
                }
                callback(null, response)
            }   
        })
    })
}
