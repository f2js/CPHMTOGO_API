const dbConnection = require("../Services/DBConnection");
const calcUtil = require("../Utils/calculatePrice");
const { ObjectID } = require("mongodb");
const AppError = require("../Utils/appError");

exports.getBasket = async (req, res, next) => {
  let db = await dbConnection.get();
  let basketCollection = await db.collection("basket");

  // TODO MAKE IT REFER TO THE USER THAT IS LOGGED IN
  const username = req.params.username;

  if (!username) {
    return next(new AppError("Missing input", 400));
  }

  const query = { "basket.user.username": username };

  let basket = await basketCollection.findOne(query);
  if (!basket) {
    res.status(500).json({ message: "Error finding data" });
  } else {
    res.status(200).json({
      basket: basket.basket,
    });
  }
};

exports.addToBasket = async (req, res, next) => {
  let db = await dbConnection.get();
  let basketCollection = await db.collection("basket");

  const { restaurant, items, user } = req.body;

  if (!restaurant || !items || !user) {
    return next(new AppError("ERROR ADDING TO BASKET.", 500));
  }

  const totalOrderPrice = calcUtil.calculateOrderPrice(items);

  const basket = {
    restaurant: restaurant,
    items: items,
    price: totalOrderPrice,
    user: user,
    updated: new Date(),
  };

  try {
    await basketCollection.updateOne(
      { "user.username": user.username },
      { $set: { basket } },
      { upsert: true }
    );
    res
      .status(200)
      .json({ message: "Success adding to basket", basket: basket });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({ message: "Failure adding to basket" });
  }
};

exports.basketToOrder = async (req, res) => {
  let db = await dbConnection.get();
  let basketCollection = await db.collection("basket");
  let orderCollection = await db.collection("orders");

  const { user } = req.body;
  // CONSIDER USING LOGGED IN USER ID INSTEAD
  let basket = await basketCollection.findOne({
    "user.username": user.username,
  });

  //TODO FIX WITH HBASE
  const totalOrderPrice = calcUtil.calculateOrderPrice(basket.basket.items);
  const order = {
    restaurant: basket.basket.restaurant,
    items: basket.basket.items,
    user: user,
    status: "Waiting",
    created: new Date(),
    updated: new Date(),
    price: totalOrderPrice,
    paymentStatus: "Not paid yet",
  };

  try {
    await basketCollection.deleteOne({ "user.username": user.username });
    await orderCollection.insertOne(order);
    res.status(200).json({ message: "Success creating order", order: order });
  } catch (e) {
    console.error("Error: ", e);
  }
};
