import express from "express";
import { Book } from "../models/Bookstore.js";

export const routes = express.Router();

// Get All the books from the database
routes.get("/Allbooks", async (request, response) => {
  try {
    const erickBooks = await Book.find({});

    return response.status(200).json({
      count: erickBooks.length,
      books: erickBooks,
    });
  } catch (error) {
    return response.status(404).json({
      error: `Error was found while fetching All Books : ${error.message}`,
    });
  }
});

// Find book by ID
routes.get("/Allbooks/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const foundBook = await Book.findById(id);

    return response.status(200).json({
      book: foundBook,
    });
  } catch (error) {
    return response.status(404).send("User was not found ");
  }
});

routes.post("/Allbooks", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).send("Send All required field");
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };
    const currentBook = await new Book(newBook);
    await currentBook.save();
    return response.status(200).send(currentBook);
  } catch (error) {
    console.log(error.message);
  }
});
const findBookWanted = async (id) => {
  const book = await Book.findById(id);
  return book;
};

// Update a scpecific book form our database

routes.put("/Allbooks/:id", async (request, response) => {
  const { id } = request.params;
  //   const { title, author, publishedYear } = await findBookWanted(id);
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).json({
        message: "Send all the fields Reuired Please",
      });
    }

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response
        .status(404)
        .send("User you trying to update doesnt exist");
    }

    await result.save();

    return response.status(200).json({
      user: await findBookWanted(id),
      message: "All data have been updated",
    });
  } catch (error) {
    console.log("Error found while trying to update record ", error.message);
  }
});

//  delete data

routes.delete("/Allbooks/:id", async (request, response) => {
  try {
    const { id } = request.params;

    let result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        message: "Book was not found ",
      });
    }
    // await result.save();
    return response.status(200).json({
      message: "Data was deleted with success",
    });
  } catch (error) {
    console.log(
      "Error was found while finding the user to delete ",
      error.message
    );
    return response.status(500).send(error.message);
  }
});
