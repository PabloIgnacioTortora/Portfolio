const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const setup = {
  createRoles: async function () {
    try {
      // Count Documents
      const count = await Role.estimatedDocumentCount();

      // check for existing roles
      if (count > 0) return;

      // Create default Roles
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]);
    } catch (error) {
      console.error(error);
    }
  },

  createAdmin: async function () {
    // check for an existing admin user
    const user = await User.findOne({ email: "pabloadmin@gmail.com" });
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
      // create a new admin user
      await User.create({
        name: "Pabloadmin",
        username: "Pabloadmin",
        email: "pabloadmin@gmail.com",
        password: await bcrypt.hash("Wutangclan8800", 10),
        roles: roles.map((role) => role._id),
      });
      console.log("Admin User Created!");
    }
  },
};
module.exports = setup;
