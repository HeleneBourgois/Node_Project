
const mongoose = require('mongoose')
const Food = require('./../models/food')
const Profil = require('./../models/profil')
const Recipe = require('./../models/recipe')

//Define a schema
let Schema = mongoose.Schema

let UserSchema = new Schema ({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true},
    dateOfBirth: Date,
    password: { type: String, required: true},
    age: Number,
    createdAt: Date


})

UserSchema.pre('save', function(next) {
    console.log( this._id + ' is going to be updated/saved, pre middleware')
    console.log(this.modifiedPaths())
    //modifiedPaths affiche les clefs modifies
    next()
})


UserSchema.pre('remove', function(next) {
    console.log(this._id + ' is going to be removed.Pre middleware remove talking')
    next()
})

//attention reprendre laction utilisee dans les controllers donc ci-dessus comme pas de update
//dans controller mais save, reprendre le save ici

UserSchema.post('save', function(doc) {
   console.log(doc._id + 'has been updated/saved')
})

UserSchema.post('remove', function(doc) {
    console.log('%s has been removed. Post middleware talking', doc._id)
    Food.remove({ _user: doc._id}, function(err) {
       if (err) {
           throw new err('error')
       }
    })

    Profil.remove({ _user: doc._id }, function(err) {
        if (err) {
            throw new err('error')
        }
    })

    Recipe.remove({ _user: doc._id }, function(err) {
        if (err) {
            throw new err('error')
        }
    })

})
//the schema is useless so far , we need to create a model using it

let User = mongoose.model('User', UserSchema)


//make this available to our users in our Node applications
module.exports = User

