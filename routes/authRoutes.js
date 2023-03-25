const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/////////////////
// // function--creating jwt token
// const createToken = (id) => {
//   return jwt.sign({ id }, "jwt secret key"); //jwt.sign
// };
////////////////////////////////////////////////
//////ROUTES//////////////////////
//////////////////////////////////
router.get("/signup", (req, res) => {
  res.render("signup");
});
//
router.get("/login", (req, res) => {
  res.render("login");
});
//
router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send();
  } catch (e) {
    res.send(e);
  }
});

//
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//logout
router.get("/logout", (req, res) => {
  //here ''- empty string is the cookie value
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});
//
module.exports = router;
