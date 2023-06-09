const { getAll, create, getOne, remove, update, setGamesImgs} = require('../controllers/game.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const gameRouter = express.Router();

gameRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

gameRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

gameRouter.route('/:id/images')
    .post(verifyJWT, setGamesImgs )

module.exports = gameRouter;