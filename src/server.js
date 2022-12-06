const app = require("./app");
const connectionDB = require("./database/connectionDB");

// Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("...Shutting down the Server due to uncaught Promise Exception");
  process.exit(1);
});

// PORT
const port = process.env.PORT || 5000;
// DATA BASE CONNECTION
connectionDB();

// server on
const serverOn = app.listen(port, () => {
  console.log(`Server is Running on : http://localhost:${port}`);
});

// unhandle promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`ERROR: ${err.message}`);
  console.log("...Shutting down the Server due to unhandled Promise Rejection");
  serverOn.close(() => {
    process.exit(1);
  });
});
