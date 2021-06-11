const mongoose = require("mongoose");
const config = require("config");

exports.initDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected`);
    return true;
  } catch (error) {
    console.log(error);
    //   process.exit(1);
    return false;
  }
};
