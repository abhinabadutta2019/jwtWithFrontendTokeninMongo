const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/////////////////
// function--creating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "jwt secret key"); //jwt.sign
};

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
  try {
    const { email, password } = req.body;
    const user = await User.create({
      email: email,
      password: password,
    });
    //
    const token = createToken(user._id);
    // // Create token
    // const token = jwt.sign({ user_id: user._id }, "jwt password");
    //
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send();
  } catch (e) {
    res.send(e);
  }
});

//
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    const user = await User.login(email, password);
    //
    const token = createToken(user._id);

    console.log(user.id, user.email);
    // const userDoc = [user._id, user.email, user.password];

    // delete user["tokens"];
    //user spread holo- object theke object e spread hoi
    const newUser = { ...user, tokens: null, password: null, token: token };
    //
    // user.tokens = null;

    // console.log(user);

    // const newUser = user.filter();
    //
    // user.tokens = user.tokens.concat({ token });
    //findbyIdandUpdate use
    // await user.save();
    // eta korle token user object er baire thakbe
    // res.send({ user: user, token });
    //token key added to user object
    // user.token = token;
    console.log(user);
    res.send({ user: newUser });
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
