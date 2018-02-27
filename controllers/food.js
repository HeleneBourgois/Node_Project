
const Food = require('./../models/food')
const moment = require('moment')
const bcrypt = require('bcrypt')

exports.create = (userId, food, callback) => { 
    food._user = userId
    let newFood = new Food(food)
    newFood.save((err) => {
        callback(err, 'new food saved')
    
    })  
}

exports.find = (filter, callback) => {
    
    Food
    .find(filter)
    .populate([
        {
            path: '_user',
            select: '_profil',
            populate: [
                { 
                    path: '_profil',
                    select: 'experienceLevel'

                }
            ]
            
        }
    ])

    .exec((err, foods) => {
        callback(err, foods)
    })
}
    
exports.update = (foodId, newFields, callback)  => {
    Food.findOne({ _id: foodId}, (err, food) => {
        food.set(newFields)
        food.save((err) => {
           console.log('Food successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (foodId, callback) => {
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



