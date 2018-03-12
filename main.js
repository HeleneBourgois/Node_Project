const express = require('express')
const app = express()
// import { app } from 'express'
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
// const config = require('./config.js')
import config from './config'
const userRouter = require('./userRouter.js')
const foodRouter = require('./foodRouter.js')
const recipeRouter = require('./recipeRouter.js')
const profilRouter = require('./profilRouter.js')
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/', userRouter)
app.use('/', foodRouter)
app.use('/', recipeRouter)
app.use('/', profilRouter)


app.listen(port, () => {
    console.log('App listening on port ' + port)
})

module.exports = userRouter
module.exports = foodRouter
module.exports = recipeRouter
module.exports = profilRouter
