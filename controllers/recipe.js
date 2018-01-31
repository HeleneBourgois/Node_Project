
const Recipe = require('./../models/recipe')
const moment = require('moment')
const bcrypt = require('bcrypt')

exports.create = (userId, recipe, callback) => { 
    console.log(recipe)
    recipe._foods = JSON.parse(recipe._foods)
    console.log(recipe)
    recipe._user = userId
    let newRecipe = new Recipe(recipe)
    newRecipe.save((err) => {
        callback(err, 'well done bb')
    
    })  
}

exports.find = (filter, callback) => {
    
    Recipe
    .find(filter)
    .populate([
        {
            path: '_user',
            select: 'username'
        }
    ])
    .sort({ name: 'asc'})
    .skip(1)
    //skip le premier
    .limit(1)
    .exec((err, foods) => {
        callback(err, foods)
    })
}
 
exports.update = (recipeId, newFields, callback)  => {
    Recipe.findOne({ _id: recipeId}, (err, recipe) => {
        // console.log(user)
        recipe.set(newFields)
        recipe.save((err) => {
            // console.log(user) 
           console.log('Recipe successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (recipeId, callback) => {
// console.log(userId)
    if (!recipeId) {
        return callback('right field necessary')
    }
    Recipe.findOne({  _id: recipeId }, (err, recipe) => { 
        recipe.remove((err) => {
            callback(err)
            console.log('recipe removed')
            
        })
    })  
}






