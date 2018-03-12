
const mongoose = require('mongoose')

//Define a schema
let Schema = mongoose.Schema

let ProfilSchema = new Schema ({
    experienceLevel: Number,
    mainQuality: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
})

//ci dessus ma carte didentite vide avec new schema

ProfilSchema.pre('save', function(next) {
    console.log(this._id + 'is going to be updated/saved ')
    next()
})

//pre and post are middleware
ProfilSchema.pre('remove', function(next) {
    console.log(this._id + 'is going to be removed')
    next()
})



ProfilSchema.post('save', function(doc) {
    console.log(this._id + ' has been updated/saved')
})

ProfilSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id)
})

//the schema is useless so far , we need to create a model using it
let Profil = mongoose.model('Profil', ProfilSchema)
//ci dessus avec somemodel = je definis ma colection

//make this available to our users in our Node applications
module.exports = Profil

