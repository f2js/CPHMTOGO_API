const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {restaurant} = require("./testHelpers/testObjects")
const dbConnection = require("../Services/DBConnection")
const mongoose = require("mongoose")
const {Schema} = require("mongoose")

process.env.NODE_ENV = "test";

let db,dbCollection;

beforeAll( async () => {
    await dbConnection.connect();
})

beforeEach(async () => {
    db = await dbConnection.get();

    dbCollection = await db.collection("restaurant");
    dbCollection.insertOne(restaurant)
})


afterEach(async () => {
    await dbCollection.deleteOne({_id: restaurant._id })
})

afterAll(async() => {
    await dbConnection.close();
})

describe("POST /menu", () => {
    const restaurantId = "62c54d09610402a01fd84fa3";

    const body = {
        id: restaurantId
    }

    test("should return 200", async () => {
        const response = await request
            .post("/menu")
            .send(body)

        expect(response.status).toBe(200)
        expect(response._body.menu).toBeTruthy();

    });
});





