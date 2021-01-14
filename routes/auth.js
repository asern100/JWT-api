const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate Data before sending to db server
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user is already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email is already exisits");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPasword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPasword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  //Validate Data before sending to db server
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //checking if user is already in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email dosn't exists");
  //Checking if passwor is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Wrong Password");

  res.send(" login SUCCESS ! ");
});

module.exports = router;
