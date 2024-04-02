import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishedYear: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);
