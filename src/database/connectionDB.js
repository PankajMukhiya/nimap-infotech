const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const connectionDB = async () => {
  try {
    const res = await mongoose.connect(dbUrl);
    console.log(
      `Database Connection Successfully with : ${res.connection.host}`
    );
  } catch (error) {
    console.log(`ERROR in dbConnection:--> ${error}`);
  }
};

module.exports = connectionDB;
