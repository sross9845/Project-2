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

//Route to show next 20 global feature events happening in the world
router.get('/',function(req,res){
    axios.get(tournamentsUrl).then(function(response){
        res.render('events/global',{responses: response.data.items.entities.tournament})
    }).catch(function(err){
        console.log(err)
    })
})

//Route to get edit page for events wher put request is
router.get('/edit/:id',function(req,res){
    db.event.findByPk(req.params.id)
    .then(function(event){
        res.render('events/edit', {event, user: req.user})
    })
})


//Show exact tournament info and a link using the slug to smash.gg site
router.get('/tournament/:slug',function(req,res){
    axios.get( tournamentUrl + req.params.slug).then(function(response){
        res.render('events/event', {
            response: response.data.entities.tournament
        })
    })
})

//Delete Saved Event by id passed in from page 
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

//Grab local events that are created and sort by date make sure user is logged in so they can create an event
router.get('/local', isLoggedIn, function(req,res){
    db.event.findAll({
        order: [
            ['date', 'ASC']
        ]
    })
    .then(function(events){
        res.render('events/local', {events, user:req.user})
    })
})
//get form for new event that needs logged in premisions
router.get('/local/new',isLoggedIn, function(req,res){
    res.render('events/new',{user:req.user});
});
//actually post a new event and then redirect to local events page
router.post('/local/new', function(req,res){
    db.event.create(req.body)
        .then(function(event){
            res.redirect('/events/local')
        });
});
//show a single local event find it by the id that gets passed in to the a tag
router.get('/local/:id', function(req,res){
    db.event.findByPk(req.params.id)
    .then(function(event){
        db.comment.findAll({
            where: {
                eventId: req.params.id
            }
        }).then(function(comments){
            res.render('events/singleLocal', {event,comments,user:req.user})

        })
    })
})
//edit local event from edit page. info gets passed in from the form from EDIT view
router.put('/local/:id', function(req,res){
    db.event.findByPk(req.params.id)
    .then(function(event){
        event.update(req.body)
        res.redirect(`/events/local/${req.params.id}`)
    })
})

//Creating a comment
router.post('/local/:id/comments', isLoggedIn, function(req,res){
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        eventId : req.body.eventId
    }).then(function(){
            res.redirect(`/events/local/${req.body.eventId}`);
        })
    });
//Find all saved messages
router.get('/saved',isLoggedIn,function(req,res){
    db.saved.findAll({
        where:{
            userId: req.user.id
        }
    })
    .then(function(events){
        res.render('events/saved',{events})
    })
})
//Create a saved event from the add to saved local event page. Then redirect to saved
router.post('/saved', function(req, res) {
    db.saved.findOrCreate({
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


module.exports = router;