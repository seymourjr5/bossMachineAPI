const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const  { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');    

ideasRouter.param('ideaId', (req, res, next, id) =>{
    let newIdea = getFromDatabaseById('ideas', id);
    if(newIdea){
        req.newIdea = newIdea;
        next();
    }else{
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) =>{
    let array = getAllFromDatabase('ideas');
    res.send(array);
});

ideasRouter.get('/:ideaId', (req, res, next) =>{
    res.send(req.newIdea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) =>{
    let newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) =>{
    let updatedId = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedId);
});

ideasRouter.delete('/:ideaId', (req, res, next) =>{
    if(deleteFromDatabasebyId('ideas', req.params.ideaId)){
        res.status(204).send();
    }else{
        res.status(500).send();
    }
});










