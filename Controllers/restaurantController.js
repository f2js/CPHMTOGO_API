const dbConnection = require("../Services/DBConnection");
const { ObjectID } = require("mongodb");

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
