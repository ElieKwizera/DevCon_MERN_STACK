const express  = require('express');
const {login,getUser} = require('../controllers/auth');
const auth = require('../middleware/auth');


const router = express.Router();


router.route('/').post(login).get(auth,getUser);

module.exports = router

