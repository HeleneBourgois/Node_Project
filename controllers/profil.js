
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






