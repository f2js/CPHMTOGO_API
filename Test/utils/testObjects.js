const restaurant =  {
	_id: "62c54d09610402a01fd84fa3"
,
	restaurant: {
	name: "Marios Pizza",
		location: {
		street: "Lyngby Hovedgade 37",
			postalcode: "2800",
			city: "Kongens Lyngby",
			country: "Danmark"
	},
	menu: {
		Burgers: [
			{
				name: "Hamburger",
				price: "15"
			},
			{
				name: "Cheeseburger",
				price: "18"
			},
			{
				name: "Chicken burger",
				price: "25"
			}
		],
			Pizzas: [
			{
				name: "Pepperoni",
				price: "55"
			},
			{
				name: "Salad kebab",
				price: "65"
			},
			{
				name: "Hawaii",
				price: "50"
			}
		]
	}
	}
}

module.exports = {
	restaurant
}