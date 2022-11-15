const dbConnection = require("../Services/DBConnection");
const AppError = require("../Utils/appError");
const bcrypt = require("bcrypt");

const BCRYPT_ROUNDS = 12;

exports.signUp = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { name, lastname, username, email, password } = req.body;

  if (!name || !lastname || !username || !email || !password) {
    return res.stats(400).json({ message: "Missing input" });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (await users.findOne({ username: username })) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const user = {
    name: name.trim(),
    lastname: lastname.trim(),
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    role: "user",
  };

  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = {
    ...user,
    password: hashedPassword,
  };

  try {
    const id = await users.insertOne(newUser);
    res.status(201).json({ message: "User created", id: id.insertedId });
  } catch (e) {
    return next(new AppError("Error creating user.", 500));
  }
};

exports.login = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing input" });
  }

  const user = await users.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ message: "Login successful", user: user });
  } else {
    res.status(400).json({ message: "Wrong password" });
  }
};

exports.getUser = async (userId) => {
  let db = await dbConnection.get();
  let userCollection = await db.collection("users");

  const query = { _id: userId };

  let user = await userCollection.findOne(query);

  return user;
};
//TODO make update statement for user to change role to
exports.promoteUserToAdmin = async (userId) => {
  let db = await dbConnection.get();
  const user = await this.getUser(userId);

  let userCollection = await db.collection("users");
};
