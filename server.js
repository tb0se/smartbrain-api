const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

// ROOT
app.get('/', (req,res) =>{
    res.json('Success');
})

// SIGN IN
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

// REGISTER
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

// PROFILE
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

// UPDATE USER ENTRIES
app.put('/image', (req,res) =>{image.handleImage(req,res,db)})

// CLARIFAI API
app.post('/imageurl', (req,res) =>{image.handleAPICall(req,res)})

app.listen(3001, ()=>{
    console.log('App is running on port 3001');
})