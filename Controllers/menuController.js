const dbConnection = require("../Services/DBConnection");
const { ObjectId } = require("mongodb");

exports.getResturantMenu = async (req, res) => {
  let db = await dbConnection.get();
  let restaurantCollection = await db.collection("restaurant");

  restaurantCollection
    .find({ _id: ObjectId(req.params.id) })
    .toArray((err, restaurant) => {
      if (err) {
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ menu: restaurant[0].menu });
    });
};
