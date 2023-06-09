const catchError = require('../utils/catchError');
const Game = require('../models/Game');
const Category = require('../models/Category');
const GameImg = require('../models/GameImg');

const getAll = catchError(async(req, res) => {
    const results = await Game.findAll({include:[Category, GameImg]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Game.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Game.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Game.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Game.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

/// SET / GAMES - IMAGES //

const setGamesImgs = catchError(async(req, res) => {
    const {id} = req.params;
    const game = await Game.findByPk(id);
    if(!game) return res.status(404).json({ message: "Game not found"});
    await game.setGameImgs(req.body);
    const images = await game.getGameImgs();
    return res.json(images);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGamesImgs
}