const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Game = require('../models/Game');
const Cart = require('../models/Cart');

const getAll = catchError(async (req, res) => {
    const userId = req.user.id;
    const purchases = await Purchase.findAll({
        include: [Game],
        where: { userId }
    });
    return res.json(purchases);
});

const buyCart = catchError(async (req, res) => {
    const userId = req.user.id;
    const buyCartPurchase = await Cart.findAll({
        where: { userId },
        attributes: ["userId", "gameId", "quantity"],
        raw: true
    });
    await Purchase.bulkCreate(buyCartPurchase);
    await Cart.destroy({ where: { userId } })
    return res.json(buyCartPurchase);
});

module.exports = {
    getAll,
    buyCart
}