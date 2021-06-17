const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");

const sign = {
  signUp: async function (req, res) {
    try {
      // Getting the Request Body
      const { name, username, email, password, roles } = req.body;
      // Creating a new User Object
      const newUser = new User({
        name,
        username,
        email,
        password: await User.encryptPassword(password),
      });

      // checking for roles
      if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }

      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();
      console.log(savedUser);

      // Create a token
      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hours
      });
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  signIn: async function (req, res) {
    try {
      // Request body email can be an email or username
      const userFound = await User.findOne({ email: req.body.username }).populate(
        "roles"
      );
      if (!userFound)
        return res.status(404).json({ message: "User Not Found" });

      const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });
      const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
        expiresIn: 3600, // 24 hours
      });
     return res.json({ token: token });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = sign;
