const express = require('express')
const { Schema } = require('mongoose')
const { findByIdAndUpdate } = require("../src/models/user.model");
const UserModel = require("../src/models/user.model");
const { route } = require('./adm');
const passport = require('passport');
const { query } = require('express');
const mainAPP = require('../modules/express')
const auth = require('../modules/auth')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

var router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cookieParser())



router.get('/', async (req, res, next)=>{

  res.clearCookie('connect.sid')
  res.clearCookie('userID');  
  
  res.redirect('/login')
  
}) 





    



module.exports = router   