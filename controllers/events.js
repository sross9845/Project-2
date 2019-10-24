const express = require('express');
const router = express.Router();
const passport = require('../config/ppconfig')
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models');
const methodOverride = require('method-override');
const axios = require('axios').default;
const tournamentsUrl = 'https://api.smash.gg/api/-/gg_api./public/tournaments/schedule;filter=%7B%22upcoming%22%3Atrue%2C%22videogameIds%22%3A7%7D;page=1;per_page=20;reset=false;schedule=true?returnMeta=true';
const tournamentUrl = 'https://api.smash.gg/tournament/'
router.use(methodOverride('_method'));




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

router.delete('/:id', function(req,res) {
	db.saved.destroy({
		where: {
    		id: req.params.id
    }
	})
	.then(function(event) {
		res.redirect('/events/saved')
	})
})


router.get('/local',function(req,res){
    db.event.findAll({
        order: [
            ['date', 'ASC']
        ]
    })
    .then(function(events){
        res.render('events/local', {events})
    })
})

router.get('/local/:id', function(req,res){
    db.event.findByPk(req.params.id)
    .then(function(event){
        db.comment.findAll({
            where: {
                eventId: req.params.id
            }
        }).then(function(comments){
            console.log(event)
            res.render('events/singleLocal', {event,comments,user:req.user})

        })
    })
})

router.post('/saved', function(req, res) {
    db.pokemon.findOrCreate({
        where:{
            name:req.body.name
        },
        defaults:{
            venue: req.body.venue,
            date: req.body.date,
            startTime: req.body.startTime,
            userId: req.body.userId
        }
    })
        .then(function(save) {
            res.redirect('/events/saved')
        })
    });

router.post('/local/:id/comments', function(req,res){
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        eventId : req.body.eventId
        }).then(function(){
            res.redirect(`/events/local/${req.body.eventId}`);
        })
    });

router.get('/saved',isLoggedIn,function(req,res){
    res.render('whats up this is the saved events pa')
})

module.exports = router;