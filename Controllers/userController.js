const dbConnection = require("../Services/DBConnection");
const AppError = require("../Utils/appError");

exports.signUp = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  //TODO CREATE UTIL METHOD TO ENCRYPT PW
  const { name, lastname, username, email, password } = req.body;

  if (!name || !lastname || !username || !email || !password) {
    return next(new AppError("Fields missing in signup.", 400));
  }

  const user = {
    user: {
      name: name.trim(),
      lastname: lastname.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: "user",
    },
  };
  try {
    await users.insertOne(user);
    res.status(200).json({ message: "Success creating user", user: user });
  } catch (e) {
    return next(new AppError("Error creating user.", 400));
  }
};

exports.login = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { email, password } = req.body;
  // CHECK IF INPUT IS EMPTY
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  //CHECK IF USER CREDENTIALS ARE CORRECT
  const query = {
    "user.email": email.trim().toLowerCase(),
    "user.password": password.trim(),
  };
  const user = await users.findOne(query);
  if (!user) {
    return next(new AppError("Invalid login credentials.", 404));
  }

  res.status(200).json({ user: user });
};

exports.getUser = async (userId) => {
  let db = await dbConnection.get();
  let userCollection = await db.collection("users");

  const query = { _id: userId };

  let user = await userCollection.findOne(query);

  return user;
};
//TODO make update statement
exports.promoteUserToAdmin = async (userId) => {
  let db = await dbConnection.get();
  const user = await this.getUser(userId);

  let userCollection = await db.collection("users");
};
