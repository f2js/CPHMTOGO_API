const dbConnection = require("../Services/DBConnection");
const calcUtil = require("../Utils/calculatePrice");
const { ObjectID } = require("mongodb");
const AppError = require("../Utils/appError");

//TODO CHANGE TO USE THE HBASE VERSION

exports.getAllOrders = async (req, res) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");
  orders.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ orders: items });
  });
};

exports.getAllCafeOrders = async (req, res) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");

  const cafeName = req.body.cafeName;

  if (!cafeName) {
    return next(new AppError("Missing input", 400));
  }

  const query = { "order.cafe": { $regex: cafeName } };

  orders.find(query).toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ orders: items });
  });
};

exports.createOrder = async (req, res, next) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");

  const { cafe, items, user } = req.body;

  if (!cafe || !items || !user) {
    return next(new AppError("Fields missing in order.", 400));
  }

  const totalOrderPrice = calcUtil.calculateOrderPrice(items);

  //TODO PAYMENT SHOULD BE DONE HERE
  const paymentAccepted = true;

  const order = {
    cafe: cafe,
    items: items,
    user: user,
    status: "waiting",
    created: new Date(),
    updated: new Date(),
    price: totalOrderPrice,
    paymentStatus: "Payment accepted",
  };

  if (paymentAccepted) {
    try {
      await orders.insertOne(order);
      res.status(200).json({ message: "Success creating order", order: order });
    } catch (e) {
      console.error("Error: ", e);
    }
  } else {
    res.status(404).json({ message: "Payment error" });
  }
};

exports.getUserOrders = async (req, res, next) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");

  // TODO MAKE IT REFER TO THE USER THAT IS LOGGED IN
  const { username, status } = req.body;
  if (!username) {
    return next(new AppError("Missing input", 400));
  }

  let query = "";
  if (status) {
    query = {
      "user.username": username.toLowerCase(),
      status: status,
    };
  } else {
    query = { "user.username": username };
  }

  orders.find(query).toArray((err, orders) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ orders: orders });
  });
};

exports.getPendingOrders = async (req, res, next) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");

  const { cafeName } = req.body;

  if (!cafeName) {
    return next(new AppError("Missing input", 400));
  }

  const query = {
    "order.cafe": { $regex: cafeName },
    "order.status": "waiting",
  };

  orders.find(query).toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ orders: items });
  });
};

exports.updateOrderStatus = async (req, res) => {
  let db = await dbConnection.get();
  let orders = await db.collection("orders");
  const { orderId, orderStatus, user } = req.body;
  //TODO MAKE IT USE THE USER FROM LOCAL STORAGE
  console.log(orderId, orderStatus, user);

  if (!user.role === "admin") {
    return next(new AppError("You don't have clearance to do this", 404));
  }

  if (!orderId || !orderStatus) {
    return next(new AppError("Missing inputs", 400));
  }

  try {
    await orders.updateOne(
      { _id: new ObjectID(orderId) },
      { $set: { "order.status": orderStatus, "order.updated": new Date() } }
    );
    res.status(200).json({ message: "Success updating order" });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({ message: "Failed to update ordert" });
  }
};
