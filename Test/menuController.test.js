const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const dbConnection = require("../Services/DBConnection")

beforeAll( async () => {
    await dbConnection.connect(()=>{});
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
            .send(body);

        expect(response.statusCode).toBe(200);
    });
});






/*
describe("Get menu", () => {
    test("Successfully fetched menu", async () => {
    //Arrange
    const restaurantId = "62c54d09610402a01fd84fa3";
    //Act
    const response = await request
      .post(`${baseUrl}/`)
      .set("id", restaurantId);

    //Assert
    expect(response.status).toBe(200);
  });
});
*/
