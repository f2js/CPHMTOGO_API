const dbConnection = require("../Services/DBConnection");
const { ObjectID } = require("mongodb");

//TODO CHANGE TO USE THE HBASE VERSION

exports.getRestuarants = async (req, res) => {
  let db = await dbConnection.get();
  let restuarantCollection = await db.collection("cafes");

  restuarantCollection.find().toArray((err, cafe) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ cafes: cafe });
  });
};
