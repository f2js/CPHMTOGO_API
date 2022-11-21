const dbConnection = require("../Services/DBConnection");
const {ObjectId} = require("mongodb");

exports.getResturantMenu = async (req, res) => {
	let db = await dbConnection.get();
	let restaurantCollection = await db.collection("restaurant");

	await restaurantCollection
		.find({_id: ObjectId(req.params.id)})
		.toArray((err, restaurant) => {
			if (restaurant.length == 0) {
				res.status(404).json({err: err})
				return;
			}
			if (err) {
				res.status(500).json({err: err});
				return;
			}
			res.status(200).json({menu: restaurant[0].menu});
		});
};
