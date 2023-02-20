const express = require("express");
const { UserModel } = require("../models/User.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

//POST REQUEST (New user registration)
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();
        res.send({ msg: "Registration Successful ✅" });
      }
    });
  } catch (err) {
    res.send(err);
  }
});

//POST REQUEST (login for existing user)
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "Login successful", "token": token });
        } else {
          res.send({ msg: "Login failed" });
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  userRouter,
};
