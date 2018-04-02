
const Profil = require('./../models/profil')
const moment = require('moment')
const bcrypt = require('bcrypt')

exports.create = (userId, profil, callback) => {
    profil._user = userId
        let newProfil = new Profil(profil)
        newProfil.save((err) => {
            callback(err, 'well done bb')
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

exports.find = (profilId, callback) => {
    Profil.findOne({ _id: profilId }, (err, profil) => {
        callback(err, profil)
    })
}

exports.update = (profilId, newFields, callback)  => {
   
    Profil.findOne({ _id: profilId}, (err, profil) => {
        // console.log(user)
        profil.set(newFields)
        profil.save((err) => {
            // console.log(user) 
           console.log('Profil successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (profilId, callback) => {
// console.log(userId)
    if (!profilId) {
        return callback('right field necessary')
    }
    Profil.findOne({  _id: profilId }, (err, profil) => { 
        profil.remove((err) => {
            callback(err)
            console.log('profil removed')
            
        })
    })  
}






