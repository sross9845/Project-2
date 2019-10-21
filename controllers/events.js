const express = require('express');
const router = express.Router();
const passport = require('../config/ppconfig')
const db = require('../models');
const axios = require('axios');

router.get('/',function(req,res){
    res.send("whats up this is the event page")
})

module.exports = router;