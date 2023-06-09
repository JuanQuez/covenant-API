const Cart = require("./Cart");
const Category = require("./Category");
const GameImg = require("./GameImg");
const Purchase = require("./Purchase");
const User = require("./User");
const Game = require("./Game");

//? relationship category -game //

Category.hasMany(Game)
Game.belongsTo(Category)

//! relationship gameimg - game //

Game.hasMany(GameImg)
GameImg.belongsTo(Game)

//* relationship Cart - User & Cart - Game//

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Game)
Game.hasMany(Cart)

// relationship purchase -user & purchase - game //

Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Game)
Game.hasMany(Purchase)



