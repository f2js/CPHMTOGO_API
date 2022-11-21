const dbConnection = require("../Services/DBConnection");
const AppError = require("../Utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTverify = require("../middleware/verifyToken");

const BCRYPT_ROUNDS = 12;

exports.signUp = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.stats(400).json({ message: "Missing input" });
    return;
  }

  if (email && !email.includes("@")) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  if (await users.findOne({ username: username })) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }

  const user = {
    name: name.toLowerCase(),
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

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.TOKEN_SECRET
  );

  try {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.header("auth-token", token).json({ message: "Login successful" });
  } catch (e) {
    return next(new AppError("Error logging in.", 500));
  }
};

// Functions for admin
exports.getAllUsers = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const allUsers = await users.find({}).toArray();

  res.status(200).json({ users: allUsers });
};

exports.getUser = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { username } = req.body;

  const user = await users.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).json({ user: user });
};

exports.deleteUser = async (req, res, next) => {
  let db = await dbConnection.get();
  let users = await db.collection("users");

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing input" });
  }

  try {
    const user = await users.findOne({ _id: ObjectId(id) });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await users.deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ message: "User deleted" });
  } catch (e) {
    return next(new AppError("Error deleting user.", 500));
  }
};
