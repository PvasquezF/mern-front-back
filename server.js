const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

const usersRoutes = require("./routes/api/users");

app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
