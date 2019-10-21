const express = require('express');
const router = express.Router();
const passport = require('../config/ppconfig')
const db = require('../models');
const axios = require('axios').default;



router.get('/',function(req,res){
    var url = 'https://api.smash.gg/api/-/gg_api./public/tournaments/schedule;filter=%7B%22upcoming%22%3Atrue%2C%22videogameIds%22%3A7%7D;page=1;per_page=30;reset=false;schedule=true?returnMeta=true';
    axios.get(url).then(function(response){
        res.render('events/global',{responses: response.data.items.entities.tournament})
    }).catch(function(err){
        console.log(err)
    })
})

router.get('/tournament/:slug',function(req,res){
    res.send('whats up')
})



router.get('/local',function(req,res){
    res.send('whats up this is the local events page')
})
router.get('/saved',function(req,res){
    res.send('whats up this is the saved events page')
})

module.exports = router;