const express =  require('express');
const app = express();
const mongoose = require('mongoose');

// connect DB
mongoose.connect('mongodb+srv://ites-jwt:iteslab@my-card.cx3k4.mongodb.net/jwt?retryWrites=true&w=majority', { useUnifiedTopology: true }, ()=>{
  console.log('connected to db SUCCESS !')  
})

// Import Routes
const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

app.listen(3000, ()=> console.log('Server Up & Running '));
