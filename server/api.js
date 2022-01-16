const express = require('express');
const apiRouter = express.Router();
const  { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');    

//minions paths
apiRouter.get('/minions', (req, res, next) =>{
    let array = getAllFromDatabase('minions');
    res.send(array);
});

apiRouter.get('/minions/:minionId', (req, res, next) =>{
    let singleMinion = getFromDatabaseById('minions', req.params.minionId);
    if(singleMinion){
        res.send(singleMinion);
    }else{
        res.status(404).send();
    }
});

apiRouter.post('/minions', (req, res, next) =>{
    let newMinion = addToDatabase('minions', req.body);
    if(newMinion){
        res.send(newMinion);
    }else{
        res.status(404).send();
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) =>{
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    if(updatedMinion !== null){
        res.send(updatedMinion);
    }else{
        res.status(404).send();
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) =>{
    if(deleteFromDatabasebyId('minions', req.params.minionId)){
        let newMinions = getAllFromDatabase('minions');
        res.send(newMinions)
    }else{
        res.status(404).send();
    }
});

//Ideas paths
apiRouter.get('/ideas', (req, res, next) =>{
    let array = getAllFromDatabase('ideas');
    res.send(array);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) =>{
    let singleId = getFromDatabaseById('ideas', req.params.ideaId);
    if(singleId){
        res.send(singleId);
    }else{
        res.status(404).send();
    }
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) =>{
    let newIdea = addToDatabase('ideas', req.body);
    if(newIdea){
        res.send(newIdea);
    }else{
        res.status(404).send();
    }
});

apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) =>{
    let updatedId = updateInstanceInDatabase('ideas', req.body);
    if(updatedId !== null){
        res.send(updatedId);
    }else{
        res.status(404).send();
    }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) =>{
    if(deleteFromDatabasebyId('ideas', req.params.ideaId)){
        let newIdeas = getAllFromDatabase('ideas');
        res.send(newIdeas);
    }else{
        res.status(404).send();
    }
});

//Meetings path
apiRouter.get('/meetings', (req, res, next) =>{
    let array = getAllFromDatabase('meetings');
    res.send(array);
});

apiRouter.post('/meetings', (req, res, next) =>{
    let newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) =>{
    deleteAllFromDatabase('meetings');
    res.send();
});

module.exports = apiRouter;
