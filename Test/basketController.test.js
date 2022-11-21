const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {basket, addToBasket} = require("./testHelpers/testObjects")
const dbConnection = require("../Services/DBConnection")

process.env.NODE_ENV = "test";

let db,dbCollection;

beforeAll( async () => {
	await dbConnection.connect();
})

beforeEach(async () => {
	db = await dbConnection.get();
	dbCollection = await db.collection("basket");
	await dbCollection.insertOne(basket)
})


afterEach(async () => {
	await dbCollection.deleteOne({_id: basket._id })
})

afterAll(async() => {
	await dbConnection.close();
})

describe("GET /basket/:userid", () => {
	const username = basket.user.username;

	test("User id | Should return 200", async () => {
		const response = await request
			.get(`/basket/${username}`)
		expect(response.status).toBe(200)
		expect(response._body).toBeTruthy();
	});
});


describe("POST /basket/", () => {
	test("Add to basket | Should return 200", async () => {
		const response = await request
			.post(`/basket/`)
			.send(addToBasket)
		expect(response.status).toBe(200)
	});

	test("Update basket | Should return 200", async () => {
		let preChangeSize = addToBasket.items.length;
		addToBasket.items = [
			{
				item: "Coffee",
				quantity: "2",
				price: 29
			},
			{
				item: "Is te",
				quantity: "3",
				price: 29
			}, {
				item: "Cola ",
				quantity: "3",
				price: 39
			}
		]
		const response = await request
			.post(`/basket/`)
			.send(addToBasket)
		expect(response.status).toBe(200)
		expect(response._body.basket.items.length > preChangeSize).toBeTruthy();
	});
	test("Add to basket (restaurant undefined) | Should return 500", async () => {
		addToBasket.restaurant = undefined;
		const response = await request
			.post(`/basket/`)
			.send(addToBasket)
		expect(response.status).toBe(500)
	});
	test("Add to basket (items undefined) | Should return 500", async () => {
		addToBasket.items = undefined;
		const response = await request
			.post(`/basket/`)
			.send(addToBasket)
		expect(response.status).toBe(500)
	});
	test("Add to basket (user undefined) | Should return 500", async () => {
		addToBasket.user = undefined;
		const response = await request
			.post(`/basket/`)
			.send(addToBasket)
		expect(response.status).toBe(500)

	});
});

describe("POST /toorder/", () => {
	//TODO UPDATE WHEN HBASE IS UP AND RUNNING

	test("User id | Should return 200", async () => {
		let username = basket.user.username;
		const response = await request
			.post(`/basket/toorder/`)
			.send({user: {
				username: username
				}})
		expect(response.status).toBe(200)
	});
});
