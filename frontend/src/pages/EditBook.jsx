import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const EditBook = ({ allBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const booktoEdit = allBooks.filter((book) => {
      return book._id === id;
    });
    if (booktoEdit) {
      const { title, author, publishedYear } = booktoEdit[0];
      setTitle(title);
      setAuthor(author);
      setPublishedYear(publishedYear);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);
  const handleEditBook = () => {
    setLoading(true);
    const newBook = {
      title: title,
      author: author,
      publishedYear: publishedYear,
    };
    axios
      .put(`http://localhost:8080/Allbooks/${id}`, newBook)
      .then((response) => {
        console.log("book updated with success");
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book details edited with success", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(`Error was found ${error}`);
        enqueueSnackbar("Error while editing book ", { variant: "error" });
        setLoading(false);
      });
  };
  console.log(allBooks);
  return (
    <div className="p-10 my-20">
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <h1 className="text-3xl my-4">Edit Book</h1> <BackButton />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Publish Year</label>
              <input
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>
            <button
              className="p-2 bg-sky-300 m-8"
              onClick={() => handleEditBook()}
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditBook;
