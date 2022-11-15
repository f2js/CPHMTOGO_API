const dbConnection = require("../Services/DBConnection");
const { ObjectId } = require("mongodb");
const AppError = require("../Utils/appError");

exports.getMenuFromRestaurant = async (req, res, next) => {
  let db = await dbConnection.get();
  let menuCollection = await db.collection("restaurant");

  const restaurantId = ObjectId(req.body.id);

  if (!restaurantId) {
    return next(new AppError("Missing input", 400));
  }

  // QUERY SKAL SE SÅDAN UD
  // {_id: ObjectId('62c6d5a9a7ea328e08a7cb83')}
  const query = { _id: restaurantId };

  console.log("restaurant id: ", "ObjectId(" + restaurantId + ")");
  console.log("Query: ", query);
  console.log("Should be: {_id: ObjectId('63725bf9ec9245a5d8b7c58c')}");

  let restaurant = await menuCollection.findOne(query);
  if (!restaurant) {
    res.status(500).json({ message: "Error finding data" });
  } else {
    res.status(200).json({
      restaurant: restaurant.restaurant.name,
      menu: restaurant.restaurant.menu,
    });
  }
};
