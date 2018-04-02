const mongoose = require('mongoose')

//Define a schema
let Schema = mongoose.Schema

let FoodSchema = new Schema ({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    color: String,
    name: { type: String},
    quantity: Number,
    _createdAt: Date
})
FoodSchema.pre('save', function(next) {
    console.log(this + 'pre middleware talking')
    next()
})

FoodSchema.pre('remove', function(next) {
    console.log(this + 'pre middleware remove talking')
    next()
})

FoodSchema.post('save', function(doc) {
    console.log('%s has been saved. Post middleware talking', doc._id)
})

FoodSchema.post('remove', function(doc) {
    console.log('%s has been removed. Post middleware talking', doc._id)
})
//the schema is useless so far , we need to create a model using it

let Food = mongoose.model('Food', FoodSchema)
//ci dessus avec somemodel = je definis ma colection

//make this available to our users in our Node applications
module.exports = Food

