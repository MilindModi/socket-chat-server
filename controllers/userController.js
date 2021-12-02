const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

//User controller methods for register and login
const register = (req, res) => {
  console.log("Register user");
  User.findOne({ email: req.body.email }, function (err, docs) {
    if (err) {
      console.log(err);
      res.send({ response: false });
    } else {
      console.log("User exists ? :"+docs);
      if (docs == null) {
        const data = new User({
          email: req.body.email,
          password: req.body.password,
        });
        data.save().then((data) => {
          var token = jwt.sign({ id: data._id }, process.env.SECRET_KEY, {
            expiresIn: 8600,
          });
          res.send({ user: data, response: true, token: token });
        });
      } else {
        console.log("Email already exists");
        res.send({ response: false });
      }
    }
  });
};
const login = async (req, res) => {
  console.log("Login user");
  User.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.send({ response: false });
      } else {
        if (docs == null) {
          res.send({ user: docs, response: false });
        } else {
          var token = jwt.sign({ id: docs._id }, process.env.SECRET_KEY, {
            expiresIn: 8600,
          });
          res.send({ user: docs, response: true, token: token });
        }
      }
    }
  );
};

module.exports = { register, login };
