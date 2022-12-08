const dbConnection = require("../Services/DBConnection");
const {ObjectID} = require("mongodb");
const AppError = require("../Utils/appError");
const axios = require("axios")


const url = "http://206.189.240.165:8080/";

exports.createOrder = async (req, res, next) => {

	const {c_id, r_id, cust_addr, rest_addr, orderlines} = req.body

	if (!c_id || !r_id || !cust_addr || !rest_addr || !orderlines) {
		//TODO NOT APP ERROR
		return next(new AppError("Fields missing in order.", 400));
	}

	const order = {
		c_id,
		r_id,
		cust_addr,
		rest_addr,
		orderlines,
	};

	//TODO ADD PAYMENT
	const paymentAccepted = true

	if (paymentAccepted) {
	  try {
	     const response = await axios.post(url + "create", order)
	    res.status(200).json({ message: "Success creating order", order: response });
	  } catch (e) {
	    console.error("Error: ", e);
	  }
	} else {
	  res.status(404).json({ message: "Payment error" });
	}
};




