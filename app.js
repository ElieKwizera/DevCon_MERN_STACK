const express  = require('express');
const morgan = require('morgan');
const helmet  = require('helmet');
const path  = require('path')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express()

app.use(express.json({extended:false}));

app.use(morgan('common'));

app.use(helmet());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/users', require('./routes/users'));

app.use('/api/posts', require('./routes/posts'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT;


app.listen(PORT, ()=>
{
    console.log(`Server running on http://localhost:${PORT}`);
});

