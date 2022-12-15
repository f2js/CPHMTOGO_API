
const axios = require("axios")
const {makePayment} = require("./paymentController")

const url = process.env.orderServiceUrl

exports.createOrder = async (req, res, next) => {

	const {c_id, r_id, cust_addr, rest_addr, orderlines, postal_code} = req.body

	if (!c_id || !r_id || !cust_addr || !rest_addr || !orderlines || !postal_code) {
		console.log("No input")
		return next();
	}

	const order = {
		c_id,
		r_id,
		cust_addr,
		rest_addr,
		orderlines,
		postal_code
	};

	const customerRestaurantId = c_id + r_id

	const orderPrice = orderlines.reduce((total, item) => total + item.price, 0)
	const paymentStatus = await makePayment(customerRestaurantId, orderPrice)

	if (paymentStatus.responseCode === 200) {
		try {
			const response = await axios.post(url + "create", order)
			console.log("create order response: ", response)
			res.status(200).json({message: "Success creating order", order: response.data});
		} catch (e) {
			console.error("Error: ", e);
			res.status(500).json({message: "Failure creating order"});
		}
	} else {
		res.status(400).json({message: "Payment failure"});
	}

};




