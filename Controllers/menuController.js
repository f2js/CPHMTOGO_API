const dbConnection = require("../Services/DBConnection");
const { ObjectID } = require("mongodb");

exports.getMenuFromCafe = async (req, res) => {
  let db = await dbConnection.get();
  let menuCollection = await db.collection("cafes");

  // TODO READ DOC AND FIX DEPRECATED & CONSIDER USING PARAMS
  const cafeId = new ObjectID(req.body.id);

  if (!cafeId) {
    return next(new AppError("Missing input", 400));
  }

  const query = { _id: cafeId };

  let cafe = await menuCollection.findOne(query);
  if (!cafe) {
    res.status(500).json({ message: "Error finding data" });
  } else {
    res.status(200).json({
      cafe: cafe.cafe.name,
      menu: cafe.cafe.menu,
    });
  }
};
