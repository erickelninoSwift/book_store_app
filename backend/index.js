import express, { json } from "express";
import { PORT, MONGODBURL } from "./config.js";
import cors from "cors";
// import { Book } from "./models/Bookstore.js";
import mongoose from "mongoose";
import { routes } from "./routes/BooksRoutes.js";
const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.get("/", (request, response) => {
  console.log("Welcome to our Bookstore");
  return response.status(200).json({
    message: "Welcome to our book store",
  });
});

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("Application connected to the Database");

    app.listen(PORT, () => {
      console.log("server is running well on : ", PORT);
    });
  })
  .catch((erro) => {
    console.error(`Error was found in the connection ${erro}`);
  });
