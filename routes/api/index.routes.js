const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const postRoutes = require("./posts.routes");

exports.initRoutes = (app) => {
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/post", postRoutes);
};
