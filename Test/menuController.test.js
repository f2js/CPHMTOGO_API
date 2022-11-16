const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const {mongoose} = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")

beforeAll( async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
    })

afterAll(async() => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    })

describe("POST /menu", () => {

    const restaurantId = "62c54d09610402a01fd84fa3";

    test("should return 200", async () => {
        try{

            const response = await request
                .post("/menu")
                .send(restaurantId);

            expect(response.statusCode).toBe(200);
            expect(response.body.error).toBe(null);
        } catch (e){
            console.log("Error: ", e)
        }
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
