const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./userRouter.js')
const foodRouter = require('./foodRouter.js')
const recipeRouter = require('./recipeRouter.js')
const profilRouter = require('./profilRouter.js')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myapp')
mongoose.Promise = global.Promise


const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    console.log('we are connected')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/', userRouter)
app.use('/', foodRouter)
app.use('/', recipeRouter)
app.use('/', profilRouter)

module.exports = userRouter
module.exports = foodRouter
module.exports = recipeRouter
module.exports = profilRouter