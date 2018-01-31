const express = require('express')
const app = express()
const controller = require('./controllers/user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myapp')
mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    console.log('we are connected')
})

app.use(bodyParser.json())

app.get('/user/:id', (req, res) => {
    controller.find(req.params.id, (err, user) => {
        // console.log(req.params.id)
        if (err) {
            res.status(500).send(err)
        }
       else {
           res.status(200).send(user)
       }
    })
    
})

app.post('/user', (req, res) => {
    controller.create(req.query, (err, message) => {
         // console.log(req.query)
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
        }
    }) 
})

app.put('/user/:id', (req, res) => {
    controller.update(req.params.id, req.query, (err) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send({message: 'user modified well'})
        }
    })  
})

app.delete('/user/:id', (req, res) => {
    controller.delete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: 'user well deleted'})
        }
    })
   
})

app.get('/login', (req, res) => {
    controller.login(req.query, (err, message) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({message: message})
        }
    })
 })


app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

