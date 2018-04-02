const Recipe = require('./../models/recipe')
const moment = require('moment')

exports.create = (userId, recipe, callback) => { 
    console.log(recipe)
// let parsing = JSON.parse(recipe._foods)
// recipe._foods = parsing
// ci deussous 2eme solution plus economique
    // recipe._foods = JSON.parse(recipe._foods)
    // console.log(recipe)
//ici le recipe._foods permet de recraser mon champs par une modification appliquee sur lui meme
//le json parse permet ici dinterpreter mon tableau de ids dans insomnia et de le parser (decouper) en tableau
//This will parse the request body into a JavaScript object and attach it to the request object.
    recipe._user = userId
//je rajoute un champs a lobjet recipe
//on peut faire += sur string et integer
    let newRecipe = new Recipe(recipe)
    newRecipe._createdAt = moment()
    newRecipe.save((err) => {
        callback(err, 'new recipe saved')
    
    })  
}

exports.find = (object, callback) => {
    // console.log(object)
    if (object.filter) {
        object.filter = JSON.parse(object.filter)
    }
    //json parse car mon front transforme mon objet en string alors que moi je veux quil conserve sa forme dobjet
    // json parse cest que pour les req.query donc ici mon objet.key donc object.filter 
    if (object.sort) {
        object.sort = JSON.parse(object.sort)
    }
    let filter = object.filter
    let sort = object.sort
    let select = object.select
    Recipe
    .find(filter)
    .select(select)
//le select ne me retourne que le champs que je mentionne
//tout ici est pour affiner ma recherche
// .populate('_user')
    // .populate([
    //     {
    //         path: '_user',
    //         select: 'username'
    //     }
    // ])
//imaginions que user ait une liaison avec profil qui est une collection
// .populate([
// {
// path: '_user',
// select: '_profil',
// populate: [
// {
// path: '_profil',
// select: 'experienceLevel'

// }
// ]
// }
// // _profil est lid qui represente une liaison avec la collection profil

// ])
//le populate revient a faire un find, path = champ sur lequel je veux faire la recherche
//le populate avec une string dedans permet de sortir tout lobjet
//mongoose est un plugin de node quipermet decrire des actions en plus pour interroger la bdd
//
    // .sort({ name: 'asc'})
    .sort(sort)
    // .skip(1)
    //skip le premier
    // .limit(1)
    .exec((err, foods) => {
        console.log(foods)
        callback(err, foods)
    })
}
// exports.find = (foodId, callback) => {
// Food.findOne({ _id: foodId }, (err, food) => {
// //ce user en parametre nexiste que dans la callback de findOne
// //findOne prend du temos comme toute action en BDD
// //user nexiste que dans la cllback donc si je lapelle en dehors il nexiste pas et surtout
// // la callback se sera effectuée avant que laction en bdd soit terminee
// //donc si la callback avait ete mise en dehors de findOne ca aurait été asynchrone car actions lancées en mm temps
// //ici puisque la callback se trouve dans la callback elle est appele une fois que laction en bdd est finie donc synchrones
// // console.log(user)
// callback(err, food)
// //si erreur ici cest mongo donc erreur serveur
// })
 
exports.update = (recipeId, newFields, callback)  => {
//ici les params sont le verre
// console.log(userId, newFields)
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
    //important de mettre condition sur param ou filter car sinon risque de suprresion de toute la bdd
    Recipe.findOne({  _id: recipeId }, (err, recipe) => { 
        recipe.remove((err) => {
            callback(err)
            console.log('recipe removed')
            // je remove les elements un par un
            
        })
    })  
}

