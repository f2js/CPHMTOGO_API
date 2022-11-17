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

  const query = { _id: restaurantId };
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
