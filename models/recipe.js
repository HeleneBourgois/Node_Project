
const mongoose = require('mongoose')
const User = require('./../models/user')

//Define a schema
let Schema = mongoose.Schema

let RecipeSchema = new Schema ({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    name: { type: String},
    createdAt: Date
})

RecipeSchema.pre('save', function(next) {
    console.log(this._id + ' is goind to be updated/saved')
    console.log(this.modifiedPaths())
    console.log(this.isModified())
    next()
})

RecipeSchema.pre('remove', function(next) {
    console.log(this._id + 'is going to be removed')
    next()
})

RecipeSchema.post('save', function(doc) {
    console.log(doc._id + ' has been updated/saved')
})

RecipeSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id)

})
//the schema is useless so far , we need to create a model using it

let Recipe = mongoose.model('Recipe', RecipeSchema)


//make this available to our users in our Node applications
module.exports = Recipe

