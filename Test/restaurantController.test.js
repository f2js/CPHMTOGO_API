const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {restaurant} = require("./testHelpers/testObjects")
const dbConnection = require("../Services/DBConnection")
const {ObjectId} = require("mongodb")

process.env.NODE_ENV = "test";

let db,dbCollection;

beforeAll( async () => {
	await dbConnection.connect();
})

beforeEach(async () => {
	db = await dbConnection.get();

	dbCollection = await db.collection("restaurant");
	await dbCollection.insertOne(restaurant)
})


afterEach(async () => {
	await dbCollection.deleteOne({_id: restaurant._id })
})

afterAll(async() => {
	await dbConnection.close();
})

describe("GET /restaurant", () => {
	test("Restaurants in list | Should return 200", async () => {
		const response = await request
			.get(`/restaurants`)
		expect(response.status).toBe(200)
		expect(response._body).toBeTruthy();
	});

	test("No restaurants in list | Should return 200", async () => {
		await dbCollection.deleteOne({_id: restaurant._id })
		const response = await request
			.get(`/restaurants`)
		expect(response.status).toBe(200)
		expect(response._body.restaurants.length).toStrictEqual(0);
	});
});

describe("GET /restaurant/:id", () => {
	test("By ID | Should return 200", async () => {
		const response = await request
			.get(`/restaurants/${restaurant._id}`)
		expect(response.status).toBe(200)
		expect(response._body).toBeTruthy();
	});
});

describe("GET /restaurant/tag/:tag", () => {
	test("By ID | Should return 200", async () => {
		const response = await request
			.get(`/restaurants/tag/${restaurant.restaurant.tag}`)
		expect(response.status).toBe(200)
		expect(response._body).toBeTruthy();
	});
});

describe("GET /restaurant/location/:city", () => {
	test("By ID | Should return 200", async () => {
		const response = await request
			.get(`/restaurants/location/${restaurant.restaurant.location.city}`)
		expect(response.status).toBe(200)
		expect(response._body).toBeTruthy();
	});
});

describe("POST /", () => {
	restaurant._id= ObjectId("62c54d09610402a01fd84fa9")
	test("Create restaurant | Should return 200", async () => {
		const response = await request
			.post(`/restaurants/`)
			.send(restaurant)
		expect(response.status).toBe(201)
		expect(response._body).toBeTruthy();
	});
});