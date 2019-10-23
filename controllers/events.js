const express = require('express');
const router = express.Router();
const passport = require('../config/ppconfig')
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models');
const axios = require('axios').default;
const tournamentsUrl = 'https://api.smash.gg/api/-/gg_api./public/tournaments/schedule;filter=%7B%22upcoming%22%3Atrue%2C%22videogameIds%22%3A7%7D;page=1;per_page=20;reset=false;schedule=true?returnMeta=true';
const tournamentUrl = 'https://api.smash.gg/tournament/'



router.get('/',function(req,res){
    axios.get(tournamentsUrl).then(function(response){
        res.render('events/global',{responses: response.data.items.entities.tournament})
    }).catch(function(err){
        console.log(err)
    })
})

router.get('/tournament/:slug',function(req,res){
    axios.get( tournamentUrl + req.params.slug).then(function(response){
        res.render('events/event', {
            response: response.data.entities.tournament
        })
    })
})

router.get('/local/new',isLoggedIn, function(req,res){
    res.render('events/new',{user:req.user});
});

router.post('/local/new', function(req,res){
    db.event.create(req.body)
        .then(function(event){
            res.redirect('/events/local')
        });
});


router.get('/local',function(req,res){
    db.event.findAll()
    .then(function(events){
        res.render('events/local', {events})

    })
})
router.get('/saved',function(req,res){
    res.send('whats up this is the saved events page')
})

module.exports = router;