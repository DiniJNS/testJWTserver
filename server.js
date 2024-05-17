const express = require('express')
const app  =  express()

const db = require('./config/db.config')
const mongoose = require('mongoose')
const userRoutes  = require('./routes/user.routes')
const authRoutes  = require('./routes/auth.routes')

const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors');

// Set up Global configuration access
dotenv.config();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

mongoose.connect(process.env.TestJWTServer)
    .then(()=>{
        console.log("Connected successfully to the DB!")
    })
    .catch((error)=>{
        console.log("Could not connect to DB due some error:", error),
        process.exit();
    })



app.use('/v1/users', userRoutes);
app.use('/v1/auth', authRoutes)


app.get('/', (req, res)=>{
    res.send("Welcome to our API");
})
app.get('/home', (req, res)=>{
    res.send("Hello World.")
})

//Render the signup page
app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname,'public','form.html'))
} )

//Render the login page

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'))
} )



app.listen(PORT, ()=>{
    console.log("Listening @ port:", PORT)
})

