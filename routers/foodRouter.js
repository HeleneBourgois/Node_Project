const express = require('express')
const app = express()
const controller = require('./../controllers/food')
const bodyParser = require('body-parser')


let foodRouter = express.Router()
app.use(bodyParser.json())
foodRouter.use(function(req, res, next) {
     next()
 })


// foodRouter.get('/food/:id', (req, res) => {
//     controller.find(req.params.id, (err, food) => {
//         // console.log(req.params.id)
//         if (err) {
//             res.status(500).send(err)
//         }
//        else {
//            res.status(200).send(food)
//        }
//     })
    
// })


foodRouter.get('/food', (req, res) => {
    controller.find(req.query, (err, foods) => {
        // console.log(req.params.id)
        //req.query correspond a mon fitlre de recherche
        //query lors du get
        //body lors du post
        if (err) {
            res.status(500).send(err)
        }
       else {
           res.status(200).send(foods)
       }
    })
    
})
foodRouter.post('/food/:userId', (req, res) => {
    controller.create(req.params.userId, req.body, (err, message) => {
        //  console.log(req.body)
        //  console.log(req.params)
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
            //renvoyer un objet est la maniere clean de faire
        }
    }) 
})

foodRouter.put('/food/:id', (req, res) => {
    controller.update(req.params.id, req.query, (err) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send({message: 'user modified well'})
        }
    })  
})

foodRouter.delete('/food/:id', (req, res) => {
    controller.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: 'food well deleted'})
        }
    })
   
})

 app.use('/', foodRouter)

module.exports =  foodRouter
