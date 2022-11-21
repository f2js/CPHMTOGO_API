const dbConnection = require("../Services/DBConnection");
const { ObjectId } = require("mongodb");

exports.getRestaurant = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  restaurantCollection.findOne(
    { _id: ObjectId(req.params.id) },
    (err, restaurant) => {
      if (err) {
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ restaurant: restaurant });
    }
  );
};

exports.getRestaurants = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  restaurantCollection.find().toArray((err, restaurant) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ restaurants: restaurant });
  });
};

exports.getRestaurantByTag = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  restaurantCollection
    .find({ tags: { $in: [req.params.tag] } })
    .toArray((err, restaurant) => {
      if (err) {
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ restaurants: restaurant });
    });
};

exports.getRestaurantsByCity = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  restaurantCollection
    .find({ "location.city": req.params.city })
    .toArray((err, restaurant) => {
      if (err) {
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ restaurants: restaurant });
    });
};

exports.createRestaurant = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  const restaurant = {
    name: req.body.name,
    rating: req.body.rating,
    openHours: req.body.phone,
    minDeliveryPrice: req.body.email,
    location: req.body.location,
    menu: req.body.menu,
    tags: req.body.tags,
  };

  restaurantCollection.insertOne(restaurant, (err, result) => {
    if (err) {
      res.status(500).json({ err: err });
      return;
    }
    res.status(201).json({ message: "Restaurant created", restaurant: result });
  });
};
