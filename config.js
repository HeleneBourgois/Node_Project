const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myapp')
mongoose.Promise = global.Promise


const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    console.log('we are connected')
})


