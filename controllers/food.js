const Food = require('./../models/food')
const moment = require('moment')


exports.create = (userId, food, callback) => { 
    food._user = userId
//je rajoute un champs a lobjet food
//on peut faire += sur string et integer
    let newFood = new Food(food)
    newFood._createdAt = moment()
    newFood.save((err) => {
        callback(err, 'new food saved')
    
    })  
}

exports.find = (filter, callback) => {
    
    Food
    .find(filter)
// .select('color')
//le select ne me retourne que le champs que je mentionne
//tout ici est pour affiner ma recherche
// .populate('_user')
// .populate([
// {
// path: '_user',
// select: 'username'
// }
// ])
//imaginions que user ait une liaison avec profil qui est une collection
    // .populate([
    //     {
    //         path: '_user',
    //         select: '_profil',
    //         populate: [
    //             { 
    //                 path: '_profil',
    //                 select: 'experienceLevel'

    //             }
    //         ]
            
    //     }
// _profil est lid qui represente une liaison avec la collection profil
    // ])
//le populate revient a faire un find, path = champ sur lequel je veux faire la recherche
//le populate avec une string dedans permet de sortir tout lobjet
//mongoose est un plugin de node qui permet decrire des actions en plus pour interroger la bdd
//
// .sort({ name: 'desc'})
// .sort(sort)
// .skip(1)
// //skip le premier
// .limit(1)
    .exec((err, foods) => {
        callback(err, foods)
        //callback = ordre vers routeur, renvoit au routeur le resultat soit erreur soit le json comprenant foods
        //callback = fonction qui est defini dans le routeur
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

exports.update = (foodId, newFields, callback)  => {
//ici les params sont le verre
// console.log(userId, newFields)
    Food.findOne({ _id: foodId}, (err, food) => {
        // console.log(user)
        food.set(newFields)
        food.save((err) => {
            // console.log(user) 
           console.log('Food successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (foodId, callback) => {
// console.log(userId)
    if (!foodId) {
        return callback('right field necessary')
    }
    Food.findOne({  _id: foodId }, (err, food) => { 
        food.remove((err) => {
            callback(err)
            console.log('user removed')
            
        })
    })  
}


