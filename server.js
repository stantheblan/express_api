// Dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const db = mongoose.connection
const cors = require('cors')
// Environment Variables
const mongoURI = process.env.MONGODB_URI

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
)
// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Environment Variables (getting ready for Heroku)
const app = express();
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: false }))
// extended: false - does not allow nested objects in query strings
app.use(express.json()); 
//use .json(), not .urlencoded()
app.use(express.static('public')) 
// we need to tell express to use the public directory for static files
//... this way our app will find index.html as the route of the application!
//We can then attach React to that file!
app.use(cors())

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT)
})





