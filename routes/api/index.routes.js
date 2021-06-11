const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");

exports.initRoutes = (app) => {
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
};
