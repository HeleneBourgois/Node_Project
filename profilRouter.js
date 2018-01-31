const express = require('express')
const app = express()
const controller = require('./controllers/profil')
const bodyParser = require('body-parser')


let profilRouter = express.Router()
app.use(bodyParser.json())
 profilRouter.use(function(req, res, next) {
     next()
 })


 profilRouter.get('/profil/:id', (req, res) => {
    controller.find(req.params.id, (err, profil) => {
        console.log(req.params.id)
        if (err) {
            res.status(500).send(err)
        }
       else {
           res.status(200).send(profil)
       }
    })
    
})

profilRouter.post('/profil/:userId', (req, res) => {
    controller.create(req.params.userId, req.query, (err, message) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
            //renvoyer un objet est la maniere clean de faire
        }
    }) 
})

profilRouter.put('/profil/:id', (req, res) => {
    controller.update(req.params.id, req.query, (err) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send({message: 'profil well modified '})
        }
    })  
})

profilRouter.delete('/profil/:id', (req, res) => {
    controller.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: 'profil well deleted'})
        }
    })
   
})

app.use('/', profilRouter)

module.exports =  profilRouter
