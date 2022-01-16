const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minionsRouter');    
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');

//Minions paths
apiRouter.use('/minions', minionsRouter);

//Ideas paths
apiRouter.use('/ideas', ideasRouter);

//Meetings paths
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter;
