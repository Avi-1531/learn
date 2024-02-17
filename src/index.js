// require("dotenv").config();

import dotenv from "dotenv";

import connectdb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectdb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running att port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed", err);
  });

// this is another way of connecting to the database
/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("error ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error has occured", error);
    throw error;
  }
})();
*/
