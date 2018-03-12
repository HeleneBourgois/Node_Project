const express = require('express')
const app = express()
const controller = require('./controllers/user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/myapp')
mongoose.Promise = global.Promise

//mongoose.promise ca permet de repercuter dans tout mon code la connexion a la BDD, une promise
//est une nouvelle facon decrire des callbacks
// je nai donc besoin de me connecter a la bdd avec localhost qune seule fois


const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    console.log('we are connected')
})

app.use(bodyParser.json())


app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

