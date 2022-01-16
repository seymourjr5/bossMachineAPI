const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const  { createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) =>{
    let array = getAllFromDatabase('meetings');
    res.send(array);
});

meetingsRouter.post('/', (req, res, next) =>{
    let newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) =>{
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});