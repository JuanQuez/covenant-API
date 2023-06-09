const catchError = require('../utils/catchError');
const { uploadToCloudinary } = require('../utils/cloudinary');
const GameImg = require('../models/GameImg');
const Game = require('../models/Game');

const getAll = catchError(async(req, res) => {
    const images = await GameImg.findAll();
    return res.json(images);
});

const create = catchError(async(req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await GameImg.create({ url, publicId: public_id });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await GameImg.findByPk(id);
    if(!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.publicId);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove,
}