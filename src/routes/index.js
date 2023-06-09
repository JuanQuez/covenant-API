const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const gameRouter = require('./game.router');
const gameImgRouter = require('./gameimg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

//! RUTAS //

router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/games', gameRouter)
router.use('/game-images', gameImgRouter)
router.use('/cart_user', cartRouter)
router.use('/purchases', purchaseRouter)

module.exports = router;