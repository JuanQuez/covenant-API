const { create, getAll, remove } = require('../controllers/gameimg.controller');
const upload = require('../utils/multer');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const gameImgRouter = express.Router();

gameImgRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create)

gameImgRouter.route('/:id')
    .delete(verifyJWT, remove)

module.exports = gameImgRouter;