const express = require('express')
const app = express()
const controller = require('./controllers/user')
const bodyParser = require('body-parser')


let userRouter = express.Router()
app.use(bodyParser.json())
 userRouter.use(function(req, res, next) {
     next()
 })
// app.use('/', routes)

// usersRouter.get('/', (req, res, next) => {
//     res.send(users)
// })

userRouter.get('/user/:id', (req, res) => {
    controller.find(req.params.id, (err, user) => {
        console.log(req.params.id)
        if (err) {
            res.status(500).send(err)
        }
       else {
           res.status(200).send(user)
       }
    })
    
})

userRouter.post('/user', (req, res) => {
    controller.create(req.query, (err, message) => {
         // console.log(req.query)
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
            //renvoyer un objet est la maniere clean de faire
        }
    }) 
})

userRouter.put('/user/:id', (req, res) => {
    controller.update(req.params.id, req.query, (err) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send({message: 'user modified well'})
        }
    })  
})

userRouter.delete('/user/:id', (req, res) => {
    controller.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: 'user well deleted'})
        }
    })
   
})

userRouter.get('/login', (req, res) => {
    controller.login(req.query, (err, message) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
        }
    })
 })
 app.use('/', userRouter)

module.exports =  userRouter
