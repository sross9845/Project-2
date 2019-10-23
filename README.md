# Washington Street Fighter Web App (Possibly extended to other fighting games)

## Description
Being an avid fighting game fan I wanted a central place where people can list events and communicate for local fighting game play. Gone are the days where if you wanted to play any fighting game you would have to go to an arcade to play in person or settle for what was mostly worse versions of the game with the console ports. Being a grassroots community like this community is has it's ups and downs. In California or New York the communities are huge and people move to be in that competitive and fun of an atmosphere. Seattle is growing in this regard. We have bi-weekly meetups on tuesdays and thursdays in Seattle and we have a monthly event that is even bigger. We host large tournaments like Red Bull Conquest and Northwest Majors. How do I know all this you ask? Well that is the problem I am trying to solve. I learned all about this from multiple resources. I stumbled upon the Discord channel for it, found tournaments on smash.gg, and learned about the game through reddit. Sure there are sites that do what parts of my site are going to do but better. However I am looking to make a site that incorporates all of this into one truly making it the perfect spring board and community the Seattle Fighting Game Community (FGC) needs.

## MVP
- [x] Show tournaments happening around the world (prototyped and can be improved by Graph QL).
- [ ] Be able to create events 
- [x] Show event page and info. Where to register and a Description.
- [ ] Save events to your saved events showing event times.
- [ ] Links to relative articles and discussion platforms

## Stretch Goals
- [ ] Comment Section on pages for discussion. (half mvp half stretch)
- [ ] Chat area for discussion
- [ ] Search by city
- [ ] Twitch channel area that could possibly tie into the chat area
- [x] Styling


## Day 1 - 3 (Friday plus the Weekend) 
Most of these days were planning. Figuring out my API was pretty fun but challenging. The documentation for the REST API I ended up using was not too great. They moved on to a GraphQL API. I ended up finding a community discord page for the old and new API and the moderators on that have been alot of help! I finished planning out alot of my models and my paths. Learned about alot of cool features already included in the API like the latitude and longitude already included in the API. I am hoping that this can help greatly with the stretch goal of mapbox. 

## Day 4 (Monday)
I tried to get the API wrangled today and I did! I got all the information I needed showing up on the screen. There were not too many problems today so I am not sure really what to talk about. I started styling and making the base routes that I needed. Not much else was happening that day. Tomorrow will be the nitty gritty.

## Day 5 (Tuesday)
Today was displaying the info on the single events when clicked. Getting the info I needed was slightly harder than I wanted but it worked! The time from my API threw me for a loop. It came out as Epoch Time and as something that I needed to display I had to get that figured out. As most that are going to read this knows probably, this seems to be a pretty common way of displaying time. It is displayed as seconds since Jan 01 1970(UTC). Oh boy that was alot of fun to know what it is. After this minor hurdle I thrust myself into getting the info I needed for the individual pages. Was not that hard to do as the API gives me alot of what I need. Started working on the pages for Local events. Once I have the local events and a way to save them to the saved page I will be at MVP other than the comments that are being moved to the Stretch Goal section.
![Screenshot of Epoch Time](https://i.imgur.com/VmAoFQg.png)
Heres how it looks now:
![Screenshot of epoch time after JS fix](https://i.imgur.com/AzvHz2y.png)