const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const  { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) =>{
    const singleMinion = getFromDatabaseById('minions', id);
    if(singleMinion){
        req.singleMinion = singleMinion;
        next();
    }else{
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) =>{
    let array = getAllFromDatabase('minions');
    res.send(array);
});

minionsRouter.get('/:minionId', (req, res, next) =>{
    res.send(req.singleMinion);
});

minionsRouter.post('/', (req, res, next) =>{
    let newMinion = addToDatabase('minions', req.body);
    if(newMinion){
        res.status(201).send(newMinion);
    }else{
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId', (req, res, next) =>{
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    if(updatedMinion !== null){ 
        res.send(updatedMinion);
    }else{
        res.status(404).send();
    }
});

minionsRouter.delete('/:minionId', (req, res, next) =>{
    const removed = deleteFromDatabasebyId('minions', req.params.minionId);
    if(removed){
        res.status(204).send();
    }else{
        res.status(500).send();
    }
});