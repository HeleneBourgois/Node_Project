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


app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

