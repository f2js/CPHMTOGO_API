const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const { user1, user2 } = require("./testHelpers/testObjects");
const dbConnection = require("../Services/DBConnection");

process.env.NODE_ENV = "test";

let db, dbCollection;

beforeAll(async () => {
  await dbConnection.connect();
});

beforeEach(async () => {
  db = await dbConnection.get();
  dbCollection = db.collection("users");
  await dbCollection.insertOne(user1);
});

afterEach(async () => {
  await dbCollection.deleteOne({ _id: user1._id });
  await dbCollection.deleteOne({ _id: user2._id });
});

afterAll(async () => {
  await dbConnection.close();
});

describe("POST users/signup", () => {
  test("Sign up | User do not exist | Should return 200", async () => {
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(201);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | user exist | Should return 400", async () => {
    const response = await request.post(`/users/signup`).send(user1);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | No @ in email | Should return 400", async () => {
    user1.email = "nomailadress.com";
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | No name | Should return 400", async () => {
    user1.name = undefined;
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | No username | Should return 400", async () => {
    user1.username = undefined;
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | No email | Should return 400", async () => {
    user1.email = undefined;
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Sign up | No password | Should return 400", async () => {
    user1.password = undefined;
    const response = await request.post(`/users/signup`).send(user2);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
});

describe("POST users/login", () => {
  // test("Login | User exist | Should return 200", async () => {
  // 	let userInfo = {username: user1.username, password: user1.password}
  // 	const response = await request
  // 		.post(`/users/login`)
  // 		.send(userInfo);
  // 	expect(response.status).toBe(200)
  // 	expect(response._body.message).toBeTruthy();
  // });

  test("Login | No username input | Should return 400", async () => {
    let userInfo = { password: user1.password };
    const response = await request.post(`/users/login`).send(userInfo);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
  test("Login | No password input | Should return 400", async () => {
    let userInfo = { username: user1.username };
    const response = await request.post(`/users/login`).send(userInfo);
    expect(response.status).toBe(400);
    expect(response._body.message).toBeTruthy();
  });
});
